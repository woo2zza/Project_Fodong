//package com.adhd.fodong.domain.gameroom.room.controller;
//
//import com.adhd.fodong.domain.gameroom.webrtc.controller.WebRtcController;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.stereotype.Controller;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Controller
//@RequiredArgsConstructor
//public class WebSocketController {
//
//    private final WebRtcController webRtcController;
//    @MessageMapping("/joinSession")
//    @SendTo("/topic/sessionUpdate")
//    public String JoinSession(@Payload String sessionName) {
//        Map<String, Object> params = new HashMap<>();
//
//        // WebRtcController의 initializeSession 메소드 호출
//        ResponseEntity<String> response = webRtcController.initializeSession(params);
//
//        if (response.getStatusCode() == HttpStatus.OK) {
//            // 세션 ID를 반환하여 클라이언트에게 전송
//            String sessionId = response.getBody();
//            return sessionId;
//
//
//
//        return sessionName;
//    }
//}
