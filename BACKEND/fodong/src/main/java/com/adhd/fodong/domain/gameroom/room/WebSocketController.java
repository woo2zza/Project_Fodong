package com.adhd.fodong.domain.gameroom.room;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.service.FriendService;
import com.adhd.fodong.domain.gameroom.room.entitiy.GameInviteRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.GameInviteResponse;
import com.adhd.fodong.domain.gameroom.room.entitiy.GameRoomJoinRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import com.adhd.fodong.domain.gameroom.room.service.GameInviteService;
import com.adhd.fodong.domain.gameroom.room.service.GameRoomSessionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final FriendService friendService;
    private final GameRoomSessionService gameRoomSessionService;
    private final SimpMessagingTemplate messagingTemplate;
    private final GameInviteService gameInviteService;

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
//    @SendTo("/toClient/game-invite-response")
    public void handleGameInvite(GameInviteRequest gameInviteRequest) {
        System.out.println("게임방 초대 STOMP 요청 도착");
        gameInviteService.sendPrivateGameInvite(gameInviteRequest);
    }

    // 게임방 초대 응답 처리
    @MessageMapping("/game-invite-response")
    public void handleGameInviteResponse(GameInviteResponse gameInviteResponse) {
        if (gameInviteResponse.isAccepted()) {
            log.info("{} 사용자가 게임방 세션 {} 초대를 수락했습니다.", gameInviteResponse.getToProfileId(), gameInviteResponse.getSessionId());
            // 초대 수락 처리 로직: 예를 들어, 사용자를 게임방 세션에 추가
        } else {
            log.info("{} 사용자가 게임방 세션 {} 초대를 거절했습니다.", gameInviteResponse.getToProfileId(), gameInviteResponse.getSessionId());
            // 초대 거절 처리 로직: 필요한 경우 구현
        }
        // 초대 응답에 대한 후속 처리 로직: 필요에 따라 추가
    }

    // 게임방 참여 요청 처리
    @MessageMapping("/game-room-join")
    public void handleGameRoomJoin(GameRoomJoinRequest joinRequest) {
        RoomSession roomSession = gameRoomSessionService.getGameRoomSession(joinRequest.getSessionId());
        if (roomSession != null) {
            roomSession.addParticipant(joinRequest.getToProfileId());
            log.info(" {} 님이 동화구연 방 {} 에 참가하셨습니다. ", joinRequest.getToProfileId(), joinRequest.getSessionId());
            updateGameRoomState(roomSession);
        } else {
            log.error("동화구연방 {} 참가 실패 ", joinRequest.getSessionId());
        }
    }

    // 게임방 상태 업데이트 메시지 전송
    private void updateGameRoomState(RoomSession roomSession) {
        Map<String, Object> stateUpdateMessage = new HashMap<>();
        stateUpdateMessage.put("sessionId", roomSession.getSessionId());
        stateUpdateMessage.put("participants", roomSession.getParticipantIds());
        stateUpdateMessage.put("gameState", roomSession.getGameState());

        messagingTemplate.convertAndSend("/toClient/game-room-state/" + roomSession.getSessionId(), stateUpdateMessage);
    }

}
