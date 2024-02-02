package com.adhd.fodong.domain.gameroom.webrtc.controller;

import io.openvidu.java.client.*;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
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

    private OpenVidu openvidu;

    @PostConstruct
    public void init() {
        this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
        System.out.println("openvidu 객체 생성 : " + openvidu);
    }

    @PostMapping("/api/sessions")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("---------------신규 세션 생성-----------------");

        // 설정한 세션
        SessionProperties properties = SessionProperties.fromJson(params).build();
        System.out.println("세션 설정 정보 : " + properties);

        // 활성화된 세션 목록에 만든 세션 id를 올림
        Session session = openvidu.createSession(properties);
        System.out.println("만든 세션 정보 : " + session);
        System.out.println("---------------------------------------------");
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }


    @PostMapping("/api/sessions/{sessionId}/connections")
    public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // 내가 연결한 openvidu 서버내에 활성화된 session을 sessionID를 찾는다
        Session session = openvidu.getActiveSession(sessionId);

        // 세션 없는 경우 처리
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }


        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }


}
