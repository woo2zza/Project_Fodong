package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.gameroom.room.entitiy.invite.GameInviteRequest;
import com.adhd.fodong.domain.gameroom.room.entitiy.invite.GameInviteResponse;
import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
@Slf4j
@RequiredArgsConstructor
public class GameInviteService {

    private final SimpMessagingTemplate messagingTemplate;

    public GameInviteResponse sendGameInvite(GameInviteRequest gameInviteRequest) {

        // 방장으로 부터 받은 세션 방정보 저장
//        String roomId = gameInviteRequest.getRoomSession().getSessionId();
        RoomSession roomSession = gameInviteRequest.getRoomSession();

        // 룸세션 정보 설정
//        RoomSession newRoomSession = new RoomSession();
//        newRoomSession.setSessionId(roomId);


        // 초대한 사람을 SET에 추가 (방장이 초대할 때)
        // 오류있음 초대갈때마다 LIST가 새로 초기화되는듯
//        Set<Integer> participantIds = roomSession.getParticipantIds();
//        if (participantIds == null) {
//            participantIds = new HashSet<>();
//        }
//        // 초대한 사람 SET에 추가 (방장 초대할 때)
//        participantIds.add(gameInviteRequest.getFromProfileId());
//        roomSession.setParticipantIds(participantIds);
        updateParticipantIds(roomSession, gameInviteRequest.getFromProfileId());


        // 만든 방ID 등 저장해서 응답
        GameInviteResponse gameInviteResponse = new GameInviteResponse();
        gameInviteResponse.setRoomSession(roomSession);
        gameInviteResponse.setFromProfileId(gameInviteRequest.getFromProfileId());
        gameInviteResponse.setToProfileId(gameInviteRequest.getToProfileId());
        gameInviteResponse.setAction(gameInviteRequest.getAction());

        System.out.println("----------------------------------------------");
        System.out.println(gameInviteResponse.getFromProfileId() +" 님이 " + gameInviteResponse.getToProfileId() + " 에게 초대요청");
        System.out.println("방 세션 정보 : " + gameInviteResponse.getRoomSession().getSessionId());
        System.out.println("현재 참가자 정보 : " + gameInviteResponse.getRoomSession().getParticipantIds());
        System.out.println("----------------------------------------------");
        return gameInviteResponse;
    }


    public GameInviteResponse acceptedGameInvite(GameInviteRequest gameInviteRequest) {

        // 방장으로 부터 받은 세션 방정보 저장
        RoomSession roomSession = gameInviteRequest.getRoomSession();

        // 룸세션 정보 설정
//        RoomSession newRoomSession = new RoomSession();
//        newRoomSession.setSessionId(roomId);

        // 수락한 사람 참여자 SET에 추가
//        Set<Integer> participantIds = roomSession.getParticipantIds();
//        participantIds.add(gameInviteRequest.getFromProfileId());
//        roomSession.setParticipantIds(participantIds);
        updateParticipantIds(roomSession, gameInviteRequest.getToProfileId());

        // 만든 방ID 등 저장해서 응답
        GameInviteResponse gameInviteResponse = new GameInviteResponse();
        gameInviteResponse.setRoomSession(roomSession);
        gameInviteResponse.setFromProfileId(gameInviteRequest.getFromProfileId());
        gameInviteResponse.setToProfileId(gameInviteRequest.getToProfileId());
        gameInviteResponse.setAction("accepted");

        System.out.println("----------------------------------------------");
        System.out.println(gameInviteResponse.getFromProfileId() +" 님이 " + gameInviteResponse.getToProfileId() + " 님의 초대요청 수락");
        System.out.println("방 세션 정보 : " + gameInviteResponse.getRoomSession().getSessionId());
        System.out.println("현재 참가자 정보 : " + gameInviteResponse.getRoomSession().getParticipantIds());
        System.out.println("----------------------------------------------");

        return gameInviteResponse;
    }

    public void updateParticipantIds(RoomSession roomSession, Integer profileId) {
        Set<Integer> participantIds = roomSession.getParticipantIds();
        if (participantIds == null) {
            participantIds = new HashSet<>();
            roomSession.setParticipantIds(participantIds); // RoomSession 객체에 새로운 Set 할당
        }
        participantIds.add(profileId);
    }

}
