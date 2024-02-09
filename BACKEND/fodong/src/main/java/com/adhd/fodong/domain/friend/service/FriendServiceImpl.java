package com.adhd.fodong.domain.friend.service;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.friend.entity.Status;
import com.adhd.fodong.domain.friend.repository.FriendRepository;
import com.adhd.fodong.domain.user.profile.entity.ProfileEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    private final FriendRepository friendRepository;

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

        Integer existingFriendship = friendRepository.findFriendshipIdByFromIdWithToId(friendship);

        if (existingFriendship == null) {
            // 두 프로필간 친구관계 설정이 없다면
            friendRepository.sendFriendRequest(friendship);
            Integer getFriendshipId = friendRepository.findFriendshipIdByFromIdWithToId(friendship);
            friendship.setFriendshipId(getFriendshipId);
            System.out.println(friendRequest.getFromProfileId() + "이 " + friendRequest.getToProfileId() + "에게 친구 요청을 했습니다.");
        } else {
            // 친구관계가 이미 있다면
            throw new RuntimeException("이미 있는 친구 관계");
        }

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

        // 해당 관계의 status를 accepted로 바꾼다
        friendRepository.updateStatus(friendship);
        System.out.println("친구 요청 수락");
    }

    @Override
    @Transactional
    public void rejectFriendRequest(FriendRequest friendRequest) {
        // from_profile_id, to_profile_id 를 통해 friendship_id를 찾고
        Friendship friendship = new Friendship();
        friendship.setFromProfileId(friendRequest.getFromProfileId());
        friendship.setToProfileId(friendRequest.getToProfileId());
        friendship.setStatus(Status.BLOCKED);

        // 해당 관계의 status를 blocked로 바꾼다
        friendRepository.updateStatus(friendship);
        System.out.println("친구 요청 거부");
    }

}
