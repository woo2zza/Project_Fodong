package com.adhd.fodong.domains.chat.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ChatDtoV1 {

    public enum MessageType {
        // 메시지 타입 : 입장, 채팅
        ENTER, TALK
    }

    private MessageType type;
    private String roomId;
    private String sender;
    private String message;
    private String time;
}
