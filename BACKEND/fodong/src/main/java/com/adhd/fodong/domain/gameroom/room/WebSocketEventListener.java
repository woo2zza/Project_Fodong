package com.adhd.fodong.domain.gameroom.room;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class WebSocketEventListener {
    private final Map<String, String> sessionUserMap = new ConcurrentHashMap<>();
    private final Map<String, String> userSessionMap = new ConcurrentHashMap<>();

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectEvent event) {
        SimpMessageHeaderAccessor headers = SimpMessageHeaderAccessor.wrap(event.getMessage());
        String profileId = headers.getFirstNativeHeader("profileId"); // 여기서 사용자 ID를 얻는 방식은 프로젝트에 따라 다를 수 있습니다.
        System.out.println("소켓 연결 시 받은 프로필 ID" + profileId );

        String sessionId = headers.getSessionId();
        sessionUserMap.put(sessionId, profileId);
        userSessionMap.put(profileId, sessionId);
        System.out.println("User Connected: 프로필 아이디:" + profileId + " 이 세션 " + sessionId + " 로 접속");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        String profileId = sessionUserMap.get(sessionId);
        sessionUserMap.remove(sessionId);
        userSessionMap.remove(profileId);
        System.out.println("User Disconnected 프로필 아이디: " + profileId + " 이 세션 " + sessionId + " 로부터 접속 해제");
    }


    public String getSessionIdByProfileId(String profileId) {
        return userSessionMap.get(profileId);
}
}
