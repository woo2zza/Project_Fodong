package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class RoomSession {
    private String sessionId;
    private Set<String> participantIds; // 참가자의 세션 ID 목록
    private String gameState; // 게임 상태 (예: 대기 중, 진행 중)

    public RoomSession() {
    }

    public RoomSession(String sessionId) {
        this.sessionId = sessionId;
        this.participantIds = new HashSet<>();
        this.gameState = "waiting"; // 기본 상태는 대기 중
    }

    // 참가자 ID를 추가하는 메서드
    public void addParticipant(String participantId) {
        this.participantIds.add(participantId);
    }

    // 참가자 ID를 제거하는 메서드도 추가할 수 있습니다.
    public void removeParticipant(String participantId) {
        this.participantIds.remove(participantId);
    }

}
