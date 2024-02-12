package com.adhd.fodong.domain.gameroom.room.entitiy;

import lombok.Data;

@Data
public class GameInviteRequest {
    private String toAccountEmail; // 푸쉬알람 식별을 위한 스프링 시큐리티 Principal
    private String fromProfileId; // 초대를 보내는 사용자 ID
    private String toProfileId; // 초대받는 사용자 ID
    private String sessionId; // 방장이 만든 게임방 세션 ID
    private String action;


    public GameInviteRequest(String toAccountEmail,String fromProfileId, String toProfileId , String sessionId) {
        this.toAccountEmail = toAccountEmail;
        this.fromProfileId = fromProfileId;
        this.toProfileId = toProfileId;
        this.sessionId = sessionId;
    }
}