package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.gameroom.room.entitiy.Room;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class RoomManager {
    private Map<String, Room> rooms = new ConcurrentHashMap<>();

    public Room createRoom(String roomId) {
        Room room = new Room(roomId);
        rooms.put(roomId, room);
        return room;
    }
    
    public Room getRoom(String roomId) {
        // roomId로 Room 객체정보 가져오기
        return rooms.get(roomId);
    }

    public void removeRoom(String roomId) {
        rooms.remove(roomId);
    }
}
