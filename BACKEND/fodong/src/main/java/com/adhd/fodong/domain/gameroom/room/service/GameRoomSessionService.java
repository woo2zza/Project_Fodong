package com.adhd.fodong.domain.gameroom.room.service;

import com.adhd.fodong.domain.book.dto.CharacterDetail;
import com.adhd.fodong.domain.book.entity.Character;
import com.adhd.fodong.domain.book.repository.BookRepository;
import com.adhd.fodong.domain.book.service.BookService;
import com.adhd.fodong.domain.gameroom.room.entitiy.RoomSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class GameRoomSessionService {

    private final BookService bookService;
    private final BookRepository bookRepository;
    private final ConcurrentHashMap<String, RoomSession> gameRoomSessions = new ConcurrentHashMap<>();

    public RoomSession createGameRoomSession(int bookId) {
        // 고유한 세션 ID 생성
        String sessionId = UUID.randomUUID().toString();
        RoomSession newRoomSession = new RoomSession(sessionId);

        // 게임방 세션 정보 저장
        gameRoomSessions.put(sessionId, newRoomSession);

        // 해당 bookId의 등장인물 리스트를 가져오고
        List<Character> characters = bookRepository.getAllCharactersByBookId(bookId);
        // 이를 roleToChar 맵에 String(키) 로 넣어서 저장한다.
        Map<String, Integer> roleToChar = new HashMap<>();
        for (Character character : characters) {
            // 값은 일단 null로 둔다
            roleToChar.put(character.getCharacterName(), null);
        }
        newRoomSession.setRoleToChar(roleToChar);

        return newRoomSession;
    }

    public RoomSession getGameRoomSession(String sessionId) {
        return gameRoomSessions.get(sessionId);
    }

    // 추가적인 게임방 세션 관리 로직 (예: 세션 삭제, 참가자 추가/제거 등)
}
