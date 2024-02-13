package com.adhd.fodong.domain.gameroom.room.service;


import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.ready.ReadyDataResponse;
import org.springframework.stereotype.Service;

import java.util.Map;

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


    public ReadyDataResponse setRole(ReadyDataRequest readyDataRequest) {
        // 보낸 역할과 profileID를 매핑한다

        // 룸세션 객체에 동화캐릭터 역할 매핑 정보를 업데이트한다.
        RoomSession roomSession = readyDataRequest.getRoomSession();
        Map<String, Integer> newRoles = updateRoles(readyDataRequest, readyDataRequest.getProfileId());
        roomSession.setRoleToChar(newRoles);
        
        
        //응답 객체에 담아서 보낸다
        ReadyDataResponse roleResponse = new ReadyDataResponse();
        roleResponse.setRoomSession(roomSession);
        roleResponse.setAction("selectRole");

        return roleResponse;
    }

    public Map<String, Integer> updateRoles(ReadyDataRequest readyDataRequest, Integer profileId) {
        // 사용자의 역할 매핑 정보를 업데이트한다
        
        // 요청으로 부터 현재 역할 정보를 가져오고
        Map<String, Integer> nowRoles = readyDataRequest.getRoomSession().getRoleToChar();
        String needUpdateRole = readyDataRequest.getRole();
        // nowRoles의 키 중 updateRole 에 해당하는 키를 찾고
        // profileId로 값을 바꿔준다.
        if (nowRoles.containsKey(needUpdateRole)) {
            nowRoles.put(needUpdateRole, profileId);
        }

        return nowRoles;
    }
}
