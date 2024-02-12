package com.adhd.fodong.domain.gameroom.room.entitiy;


import lombok.Data;

@Data
public class GameInviteResponse {
    private String roomSessionId; // 방장이 만든 게임방 세션 ID
    private String fromProfileId; // 초대를 보내는 사용자 ID
    private String toProfileId; // 초대 받은 사용자 Id
    private String action;
    private boolean accepted;
}
