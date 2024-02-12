package com.adhd.fodong.domain.gameroom.room.service;


import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataResponse;
import org.springframework.stereotype.Service;

@Service
public class ReadyService {

    public ReadyDataResponse getStart(ReadyDataRequest readyDataRequest) {
        // 시작 버튼을 누르면 세션방Id를 오픈비두 캠 이름으로하여 넘어간다

        // 현재 게임방 세션 가져오기
        String roomId = readyDataRequest.getRoomSession().getSessionId();

        // 응답 객체에 데이터 담아서 넘겨주기
        ReadyDataResponse readyDataResponse = new ReadyDataResponse();
        readyDataResponse.setRoomSession(readyDataRequest.getRoomSession());
        readyDataResponse.setOpenViduName(roomId);
        readyDataResponse.setAction("move");
        
        return readyDataResponse;
    }


}
