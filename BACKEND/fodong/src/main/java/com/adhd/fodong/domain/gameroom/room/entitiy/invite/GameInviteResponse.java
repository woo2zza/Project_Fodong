package com.adhd.fodong.domain.gameroom.room.entitiy.invite;


import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.Data;


@Data
public class GameInviteResponse {
//    private String roomSessionId; // 방장이 만든 게임방 세션 ID
    private RoomSession roomSession;
    private int fromProfileId; // 초대를 보내는 사용자 ID
    private int toProfileId; // 초대 받은 사용자 Id
    private String fromNickname;
    private String toNickname;
    private String action;
    private String newTopic;

}
