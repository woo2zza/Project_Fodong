package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
public class Room {
    private String roomId; // openvidu 세션 네임으로 전달될 예정
    private Set<String> clientSessionIds = new HashSet<>(); // 방에 참여한 클라이언트(세션) 목록

    public Room(String roomId) {
        this.roomId = roomId;
    }

    public void addSession(String sessionId) {
        clientSessionIds.add(sessionId);
    }

    public void removeSession(String sessionId) {
        clientSessionIds.remove(sessionId);
    }
    
}
