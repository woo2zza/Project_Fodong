package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Data
public class RoomSession {
    private String sessionId;
    private Set<Integer> participantIds; // 참가자의 프로필 ID 목록
    private Map<String, Integer> roleToChar; // 동화 캐릭터들

    public RoomSession() {
    }

    public RoomSession(String sessionId) {
        this.sessionId = sessionId;
        this.participantIds = new HashSet<>();
    }
}
