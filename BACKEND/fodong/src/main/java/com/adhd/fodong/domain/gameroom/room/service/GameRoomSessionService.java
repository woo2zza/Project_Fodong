package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import org.springframework.stereotype.Service;

import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class GameRoomSessionService {
    private final ConcurrentHashMap<String, RoomSession> gameRoomSessions = new ConcurrentHashMap<>();

    public RoomSession createGameRoomSession() {
        // 고유한 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();
        RoomSession newRoomSession = new RoomSession(sessionId);

        // 게임방 세션 정보 저장
        gameRoomSessions.put(sessionId, newRoomSession);

        return newRoomSession;
    }

    public RoomSession getGameRoomSession(String sessionId) {
        return gameRoomSessions.get(sessionId);
    }

    // 추가적인 게임방 세션 관리 로직 (예: 세션 삭제, 참가자 추가/제거 등)
}
