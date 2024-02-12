package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.gameroom.room.entitiy.GameInviteRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.GameInviteResponse;
import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameInviteService {

    private final SimpMessagingTemplate messagingTemplate;

    public GameInviteResponse sendGameInvite(GameInviteRequest gameInviteRequest) {

        // 방장으로 부터 받은 세션 방정보 저장
        String roomId = gameInviteRequest.getSessionId();

        // 만든 방ID 등 저장해서 응답
        GameInviteResponse gameInviteResponse = new GameInviteResponse();
        gameInviteResponse.setRoomSessionId(roomId);
        gameInviteResponse.setFromProfileId(gameInviteRequest.getFromProfileId());
        gameInviteResponse.setToProfileId(gameInviteRequest.getToProfileId());
        gameInviteResponse.setAction(gameInviteResponse.getAction());

        return gameInviteResponse;
    }


//    public GameInviteResponse acceptedGameInvite(GameInviteRequest gameInviteRequest) {
//
//        // 방장으로 부터 받은 세션 방정보 저장
//        String roomId = gameInviteRequest.getSessionId();
//
//
//    }
}
