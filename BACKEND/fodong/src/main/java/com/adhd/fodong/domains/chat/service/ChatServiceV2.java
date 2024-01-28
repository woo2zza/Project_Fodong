package com.adhd.fodong.domains.chat.service;

import com.adhd.fodong.domains.chat.dto.ChatRoomV2;
import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;

@Slf4j
@Service
public class ChatServiceV2 {
    // 추후 DB 와 연결 시 Service 와 Repository(DAO) 로 분리 예정

    private Map<String, ChatRoomV2> chatRoomV2Map;

    @PostConstruct
    private void init() {
        chatRoomV2Map = new LinkedHashMap<>();
    }

    // 전체 채팅방 조회
    public List<ChatRoomV2> findAllRoom() {
        // 채팅방 생성 순서를 최근 순으로 반환
        List chatRoomV2s = new ArrayList<>(chatRoomV2Map.values());
        Collections.reverse(chatRoomV2s);

        return chatRoomV2s;
    }

    public ChatRoomV2 findRoomById(String roomId) {
        return chatRoomV2Map.get(roomId);
    }

    // roomName으로 채팅방 만들기
    public ChatRoomV2 createChatRoom(String roomName) {
        // 채팅방 이름으로 채팅룸 생성
        ChatRoomV2 chatRoomV2 = new ChatRoomV2().createRoom(roomName);

        // map에 채팅룸 아이디와 만들어진 채팅룸을 저장 (임시 DB저장역할)
        chatRoomV2Map.put(chatRoomV2.getRoomId(), chatRoomV2);

        return chatRoomV2;
    }

    // 채팅방 유저 리스트에 유저 추가
    public String addUser(String roomId, String userName) {
        ChatRoomV2 chatRoomV2 = chatRoomV2Map.get(roomId);
        String userUUID = UUID.randomUUID().toString();

        // 아이디 중복 확인 후 userList 에 추가
        chatRoomV2.getUserList().put(userUUID, userName);

        return userUUID;
    }

    // 채팅방 유저 이름 중복확인
    public String isDuplicateName(String roomId, String username) {
        ChatRoomV2 room = chatRoomV2Map.get(roomId);
        String tmp = username;

        // 만약 userName 이 중복이라면 랜덤한 숫자를 붙임
        // 이때 랜덤한 숫자를 붙였을 때 getUserlist 안에 있는 닉네임이라면 다시 랜덤한 숫자 붙이기!
        while (room.getUserList().containsValue(tmp)) {
            int ranNum = (int) (Math.random() * 100) + 1;
            tmp = username + ranNum;
        }

        return tmp;
    }

    // 채팅방 유저 리스트 삭제
    public void delUser(String roomId, String userUUID){
        ChatRoomV2 room = chatRoomV2Map.get(roomId);
        room.getUserList().get(userUUID);
    }

    // 채팅방 userName 조회
    public String getUserName(String roomId, String userUUID){
        ChatRoomV2 chatRoomV2 = chatRoomV2Map.get(roomId);
        return chatRoomV2.getUserList().get(userUUID);
    }


    // 채팅방 전체 userlist 조회
    public ArrayList<String> getUserList(String roomId){
        ArrayList<String> list = new ArrayList<>();

        ChatRoomV2 chatRoomV2 = chatRoomV2Map.get(roomId);


        // hashmap 을 for 문을 돌린 후
        // value 값만 뽑아내서 list 에 저장 후 reutrn
        chatRoomV2.getUserList().forEach((key, value) -> list.add(value));
        return list;
    }



    // 채팅방 인원+1
    public void plusUserCnt(String roomId) {
        ChatRoomV2 chatRoomV2 = chatRoomV2Map.get(roomId);
        chatRoomV2.setUserCount(chatRoomV2.getUserCount() + 1);
    }

    // 채팅방 인원-1
    public void minusUserCnt(String roomId){
        ChatRoomV2 chatRoomV2 = chatRoomV2Map.get(roomId);
        chatRoomV2.setUserCount(chatRoomV2.getUserCount()-1);
    }



}
