package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

@Data
public class GameRoomJoinRequest {
    private String toProfileId;
    private String sessionId;
}
