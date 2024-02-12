package com.adhd.fodong.domain.gameroom.room.entitiy.ready;


import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.Data;

@Data
public class ReadyDataRequest {
    private RoomSession roomSession;
    private Boolean isStart = false;
}
