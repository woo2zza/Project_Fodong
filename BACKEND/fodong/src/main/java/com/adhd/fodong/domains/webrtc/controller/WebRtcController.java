package com.adhd.fodong.domains.webrtc.controller;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@CrossOrigin(origins = "*")
@RestController
public class WebRtcController {


    @Value("${OPENVIDU_URL}")
    private String OPENVIDU_URL;

    @Value("${OPENVIDU_SECRET}")
    private String OPENVIDU_SECRET;

    private OpenVidu openVidu;

    @PostConstruct
    public void init() {
        this.openVidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }


    // 세션 초기화 메서드
    // 클라이언트로부터 설정정보를 받고 세션을 생성해 세션 반환함
    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(
            @RequestBody(required = false) Map<String, Object> params) throws
            OpenViduJavaClientException, OpenViduHttpException {

        SessionProperties properties = SessionProperties.fromJson(params).build();
        Session session = openVidu.createSession(properties);

        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }


    // 커넥션 생성 메서드
    // 클라이언트로부터 세션Id와 설정정보를 받고
    // 세션에 새로운 연결을 생성하고(특정 세션에 새로운 참가자 생성)
    // 토큰을 반환
    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(
            @PathVariable("sessionId") String sessionId,
            @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        Session session = openVidu.getActiveSession(sessionId);
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);

        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }

}
