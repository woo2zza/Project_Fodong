package com.adhd.fodong.domain.gameroom.room.entitiy.invite;

import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.Data;

@Data
public class GameInviteRequest {
    private String toAccountEmail; // 푸쉬알람 식별을 위한 스프링 시큐리티 Principal
    private int fromProfileId; // 초대를 보내는 사용자 ID
    private int toProfileId; // 초대받는 사용자 ID
    private String fromNickname;
    private String toNickname;
    private String action;
//    private String sessionId; // 방장이 만든 게임방 세션 ID
    private RoomSession roomSession;
}