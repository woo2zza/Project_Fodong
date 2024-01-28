package com.adhd.fodong.domains.chat.handler;


import com.adhd.fodong.domains.chat.dto.ChatDtoV1;
import com.adhd.fodong.domains.chat.dto.ChatRoomV1;
import com.adhd.fodong.domains.chat.service.ChatServiceV1;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
    // 웹 소켓 클라이언트로부터 채팅메시지를 전달받아 채팅 메시지를 객체로 변환
    // 전달받은 메시지에 담긴 채팅방 ID로 발송 대상 채팅방 정보를 조회
    // 해당 채팅방에 입장해있는 모든 클라이언트(WebSocketSession) 에게 타입에 따른 메시지 발송
    private final ObjectMapper mapper;
    private final ChatServiceV1 chatServiceV1;

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);

        ChatDtoV1 chatMessage = mapper.readValue(payload, ChatDtoV1.class);
        log.info("session {}", chatMessage.toString());

        ChatRoomV1 room = chatServiceV1.findRoomById(chatMessage.getRoomId());
        log.info("room {}", room.toString());

        room.handleAction(session, chatMessage, chatServiceV1);
    }
}
