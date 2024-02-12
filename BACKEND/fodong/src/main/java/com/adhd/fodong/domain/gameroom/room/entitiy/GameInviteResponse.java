package com.adhd.fodong.domain.gameroom.room.entitiy;


import lombok.Data;

@Data
public class GameInviteResponse {
    private String sessionId;
    private String toProfileId;
    private boolean accepted;


}
