package com.adhd.fodong.domains.chat.dto;


import com.adhd.fodong.domains.chat.service.ChatServiceV1;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Data
public class ChatRoomV1 {
    private String roomId;
    private String name;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoomV1(String roomId, String name) {
        this.roomId = roomId;
        this.name = name;
    }

    public void handleAction(WebSocketSession session, ChatDtoV1 message, ChatServiceV1 chatServiceV1) {
        // message 에 담긴 타입을 확인한다.
        // 이때 message 에서 getType 으로 가져온 내용이
        // ChatDTO 의 열거형인 MessageType 안에 있는 ENTER 과 동일한 값이라면
        if (message.getType().equals(ChatDtoV1.MessageType.ENTER)) {
            // sessions 에 넘어온 session을 담고,
            sessions.add(session);
            // message 에는 입장하였다는 메시지를 띄운다
            message.setMessage(message.getSender() + " 님이 입장하셨습니다");
            sendMessage(message, chatServiceV1);

        } else if (message.getType().equals(ChatDtoV1.MessageType.TALK)) {
            // TALK 타입이면 메시지 보낸다
            message.setMessage(message.getMessage());
            sendMessage(message, chatServiceV1);
        }
    }

    public <T> void sendMessage(T message, ChatServiceV1 chatServiceV1) {
        sessions.parallelStream()
                .forEach(session -> chatServiceV1.sendMessage(session, message));
    }
}

