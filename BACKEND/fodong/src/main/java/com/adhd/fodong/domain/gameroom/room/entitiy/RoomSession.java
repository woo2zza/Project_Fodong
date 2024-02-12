package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RoomSession {
    private String sessionId;
    private Set<Integer> participantIds; // 참가자의 프로필 ID 목록

    public RoomSession() {
    }

    public RoomSession(String sessionId) {
        this.sessionId = sessionId;
        this.participantIds = new HashSet<>();
    }
}
