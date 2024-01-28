package com.adhd.fodong.domains.chat.service;


import com.adhd.fodong.domains.chat.dto.ChatRoomV1;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;

@Slf4j
@Data
@Service
public class ChatServiceV1 {
    private final ObjectMapper mapper;
    private Map<String, ChatRoomV1> chatRooms;


    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoomV1> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoomV1 findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoomV1 createRoom(String name) {
        String roomId = UUID.randomUUID().toString();

        // Builder 를 이용해서 ChatRoom 을 Building
        ChatRoomV1 room = ChatRoomV1.builder()
                .roomId(roomId)
                .name(name)
                .build();

        chatRooms.put(roomId, room); //랜덤 아이디와 room 정보를 Map에 저장
        return room;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
