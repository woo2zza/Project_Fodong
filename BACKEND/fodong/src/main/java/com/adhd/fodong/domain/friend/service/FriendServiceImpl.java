package com.adhd.fodong.domain.friend.service;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.friend.entity.Status;
import com.adhd.fodong.domain.friend.repository.FriendRepository;
import com.adhd.fodong.domain.gameroom.room.WebSocketEventListener;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import com.adhd.fodong.domain.user.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;
    private final ProfileRepository profileRepository;
    private final SimpMessagingTemplate messagingTemplate; // 웹소켓 메시지 전송을 위한 SimpMessagingTemplate 주입
    private final WebSocketEventListener webSocketEventListener;

    private static final ConcurrentHashMap<String, Boolean> requestCache = new ConcurrentHashMap<>();


    @Override
    public List<ProfileEntity> findProfilesByNickname(String nickname) {
        // 입력한 닉네임이 없는 경우 빈 배열 리턴
        if (nickname == null || nickname.trim().isEmpty()) {
            return new ArrayList<>();
        } else {
            List<ProfileEntity> profilesByNickname = friendRepository.findProfilesByNickname(nickname);
            return profilesByNickname;
        }
    }

    @Override
    public List<ProfileEntity> getRelations(int profileId) {
        // 친구관계를 모두 조회하는데
        // 거절한 애들은 필요 없으니 필터링하고 전달
        List<ProfileEntity> Entities = friendRepository.getFriendsByProfileId(profileId);

        return Entities;
    }

    @Override
    @Transactional
    public Friendship sendFriendRequest(FriendRequest friendRequest) {

        Friendship friendship = new Friendship();
        friendship.setFromProfileId(friendRequest.getFromProfileId());
        friendship.setToProfileId(friendRequest.getToProfileId());
        friendship.setStatus(Status.REQUESTED);


        // 존재하는 관계인지 검증
        Integer existingFriendship = friendRepository.findFriendshipIdByFromIdWithToId(friendship);
        System.out.println(existingFriendship);

        if (existingFriendship != null) {
            // 존재하는 관계라면
            // 어떤상태인지 확인
            String nowStatus = friendRepository.getStatusByFriendshipId(existingFriendship);

            // 이미 요청한 상태라면
            if (Status.REQUESTED.name().equals(nowStatus)) {
                throw new RuntimeException("이미 친구신청이 되어있음");
            }
            // 상대가 거절했던 상태라면
            if (Status.BLOCKED.name().equals(nowStatus)) {
                friendRepository.deleteRelation(existingFriendship);
                System.out.println("친구 거절했었음 관계 삭제");
                return sendFriendRequest(friendRequest);
            }

            if (Status.ACCEPTED.name().equals(nowStatus)) {
                throw new RuntimeException("이미 친구인 상태");
            }
        }

        // 두 프로필간 친구관계 설정이 없다면
        friendRepository.sendFriendRequest(friendship);
        System.out.println("친구관계 설정!");

        Integer getFriendshipId = friendRepository.findFriendshipIdByFromIdWithToId(friendship);
        friendship.setFriendshipId(getFriendshipId);
        System.out.println(friendRequest.getFromProfileId() + "이 " + friendRequest.getToProfileId() + "에게 친구 요청을 했습니다.");


        return friendship;
    }

    @Override
    @Transactional
    public void acceptFriendRequest(FriendRequest friendRequest) {
        // from_profile_id, to_profile_id 를 통해
        Friendship friendship = new Friendship();
        friendship.setFromProfileId(friendRequest.getFromProfileId());
        friendship.setToProfileId(friendRequest.getToProfileId());
        friendship.setStatus(Status.ACCEPTED);

        System.out.println("수락 요청 FromId : " + friendRequest.getFromProfileId());
        System.out.println("수락 요청 ToId : " + friendRequest.getToProfileId());

        // 해당 관계의 status를 accepted로 바꾼다
        friendRepository.updateStatus(friendship);
        System.out.println("친구 요청 수락");

        // 친구 요청을 보낸 사용자에게 수락 알림 전송
        String fromUserSessionId = webSocketEventListener.getSessionIdByProfileId(String.valueOf(friendRequest.getFromProfileId()));
        if (fromUserSessionId != null) {
            messagingTemplate.convertAndSendToUser(
                    fromUserSessionId,
                    "/toClient/friend-request-response", // 수정된 경로
                    "Your friend request to " + friendRequest.getToProfileId() + " has been accepted.");
        }
    }


    @Override
    @Transactional
    public void rejectFriendRequest(FriendRequest friendRequest) {
        // from_profile_id, to_profile_id 를 통해 friendship_id를 찾고
        Friendship friendship = new Friendship();
        friendship.setFromProfileId(friendRequest.getFromProfileId());
        friendship.setToProfileId(friendRequest.getToProfileId());
        friendship.setStatus(Status.BLOCKED);

        System.out.println("거절 요청 FromId : " + friendRequest.getFromProfileId());
        System.out.println("거절 요청 ToId : " + friendRequest.getToProfileId());

        // 해당 관계의 status를 blocked로 바꾼다
        friendRepository.updateStatus(friendship);
        System.out.println("친구 요청 거부");

        // 친구 요청을 보낸 사용자에게 거부 알림 전송
        String fromUserSessionId = webSocketEventListener.getSessionIdByProfileId(String.valueOf(friendRequest.getFromProfileId()));
        if (fromUserSessionId != null) {
            messagingTemplate.convertAndSendToUser(
                    fromUserSessionId,
                    "/toClient/friend-request-response", // 수정된 경로
                    "Your friend request to " + friendRequest.getToProfileId() + " has been rejected.");

        }
    }
}
