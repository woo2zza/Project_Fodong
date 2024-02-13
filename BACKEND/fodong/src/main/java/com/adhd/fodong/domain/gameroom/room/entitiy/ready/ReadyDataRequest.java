package com.adhd.fodong.domain.gameroom.room.entitiy.ready;


import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.Data;

import java.util.Map;

@Data
public class ReadyDataRequest {
    private RoomSession roomSession; // 방 세션Id, 참가자목록, 동화캐릭터 역할 정보
    private int profileId;
    private Boolean isStart = false;
    private String role;
    private String action;  // 혹시 클라이언트에서 분기 처리 필요할까봐
}
