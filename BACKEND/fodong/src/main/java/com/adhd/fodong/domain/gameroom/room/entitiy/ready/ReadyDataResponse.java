package com.adhd.fodong.domain.gameroom.room.entitiy.ready;

import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.Data;

import java.util.Map;

@Data
public class ReadyDataResponse {
    // 설정방 데이터
    private RoomSession roomSession;
    private int profileId;
    private String role;
    private String action;  // 혹시 클라이언트에서 분기 처리 필요할까봐
    private String openViduName;  // 같이 참여할 오픈비두 컨퍼런스 이름
    private String newTopic;
}
