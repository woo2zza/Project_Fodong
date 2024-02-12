package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.gameroom.room.entitiy.GameInviteRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameInviteService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendPrivateGameInvite(GameInviteRequest gameInviteRequest) {
        HashMap<String, Object> response = new HashMap<>();

        try {
            // 초대 메시지 로직 구현
            log.info("{} 님이 {}를 동화구연방(세션 ID: {})에 초대했습니다.", gameInviteRequest.getFromProfileId(), gameInviteRequest.getToProfileId(), gameInviteRequest.getSessionId());

            // 메시지 내용 설정
            response.put("toAccountEmail", gameInviteRequest.getToAccountEmail());
            response.put("fromProfileId", gameInviteRequest.getFromProfileId());
            response.put("toProfileId", gameInviteRequest.getToProfileId());
            response.put("sessionId", gameInviteRequest.getSessionId());
            response.put("message", gameInviteRequest.getFromProfileId() + " 님으로부터 같이 동화구연 하자는 요청이 왔어요!");

            // 특정 사용자에게 메시지 전송
            messagingTemplate.convertAndSendToUser(
                    gameInviteRequest.getToAccountEmail(), // 수신자의 고유 식별자
                    "/toClient/game-invite-response", // 수신자만이 구독하는 개인 큐
                    response
            );

        } catch (Exception e) {
            log.error("Error processing game invite request: ", e);
            response.put("message", "게임방 초대 요청 처리 중 오류가 발생했습니다.");
        }

    }
}
