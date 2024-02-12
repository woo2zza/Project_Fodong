package com.adhd.fodong.domain.gameroom.room;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.service.FriendService;
import com.adhd.fodong.domain.gameroom.room.entitiy.*;
import com.adhd.fodong.domain.gameroom.room.entitiy.invite.GameInviteRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.invite.GameInviteResponse;
import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataResponse;
import com.adhd.fodong.domain.gameroom.room.service.GameInviteService;
import com.adhd.fodong.domain.gameroom.room.service.GameRoomSessionService;
import com.adhd.fodong.domain.gameroom.room.service.ReadyService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final FriendService friendService;
    private final GameInviteService gameInviteService;
    private final ReadyService readyService;

    //////////////////////////  친구기능 토픽 //////////////////////////////////////////
    @MessageMapping("/friend-request")
    @SendTo("/toClient/friend-request-response")
    public Map<String, Object> handleFriendRequest(FriendRequest friendRequest) {
        // 친구 기능과 관련된 푸쉬 토픽

        HashMap<String, Object> response = new HashMap<>();

        try {
            switch (friendRequest.getAction()) {
                case "sendRequest":
                    // 친구 요청 전송 처리 로직
                    friendService.sendFriendRequest(friendRequest);
                    log.info(friendRequest.getAction());
                    response.put("action", friendRequest.getAction());
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("message", friendRequest.getFromProfileId() + " 님이 " + friendRequest.getToProfileId() + " 에게 친구 요청을 보냈습니다.");
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    break;
                case "accept":
                    // 친구 요청 수락 처리 로직
                    friendService.acceptFriendRequest(friendRequest);
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    response.put("message", "친구 요청이 수락되었습니다.");
                    break;
                case "reject":
                    // 친구 요청 거절 처리 로직
                    friendService.rejectFriendRequest(friendRequest);
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    response.put("message", "친구 요청이 거절되었습니다.");
                    break;
                default:
                    response.put("message", "알 수 없는 요청입니다.");
                    break;
            }
            log.info("Friend request action processed successfully.");
        } catch (Exception e) {
            log.error("Error processing friend request action: ", e);
            response.put("message", "친구 요청 처리 중 오류가 발생했습니다.");
        }
        return response;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////////////////////////////////

    //////////////////////////////////////  게임방 초대 기능 토픽 //////////////////////////////////////////


    // 게임 초대 요청 푸쉬
    @MessageMapping("/game-invite")
    @SendTo("/toClient/game-invite-response")
    public GameInviteResponse handleGameInvite(GameInviteRequest gameInviteRequest) {


        switch (gameInviteRequest.getAction()) {
            case "sendInvite":
                // 초대 요청 처리 로직 구현
                // 처음 방장이 게임방 만들 때 게임방 sessonId도 GameInviteRequest에 저장해서 보낸다
                GameInviteResponse sendInviteResponse = gameInviteService.sendGameInvite(gameInviteRequest);
                return sendInviteResponse;

            case "accepted":
                // 수락 로직 처리
                GameInviteResponse inviteAccpetedResponse = gameInviteService.acceptedGameInvite(gameInviteRequest);
                inviteAccpetedResponse.setNewTopic("toClient/readyGame-response");
                return inviteAccpetedResponse;
        }
        return null;
    }

//    같은 방에 들어온 유저들은 같은 토픽을 구독하게 한다
    // 예시 토픽
    // 이 토픽을 구독하고 있는 클라이언트들 = 같은 게임방에 있는 클라이언트 라고 가정한다
    // 누군가가 시작버튼을 눌러 어떤 요청을하면 다른 클라이언트들도 똑같은 요청을 하게끔 한다

    // 게임 시작 요청 메시지 핸들링
    @MessageMapping("/readyGame")
    @SendTo("toClient/readyGame-response")
    public ReadyDataResponse shareReadyData(ReadyDataRequest readyDataRequest) {
        // 게임방 초대 수락을 누른 클라이언트들이 구독할 토픽
        // 이 토픽을 이용해서 필요한 데이터들을 실시간으로 주고받는다.

        // 시작 버튼을 누르면 오픈비두 세션으로 다 같이 이동한다
        if (readyDataRequest.getIsStart() == true) {
            // 나중에 역할 정하는 기능도 추가할거면 역할 정하기 전까지는 시작하지 않는 분기 추가해야함
            ReadyDataResponse startResponse = readyService.getStart(readyDataRequest);
//            startResponse.setNewTopic("");
            return startResponse;
        }

        // 역할 정하기 기능(?)

        return null;
    }
}
