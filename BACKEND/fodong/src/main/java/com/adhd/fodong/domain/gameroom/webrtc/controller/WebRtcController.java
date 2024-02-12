package com.adhd.fodong.domain.gameroom.webrtc.controller;

import io.openvidu.java.client.*;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Tag(name = "오픈비두 API", description = "OPENVIDU api와의 통신을 통해 화상 통화 세션을 생성")
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
        System.out.println("-----------------OPENVIDU 객체 생성------------------");
        System.out.println("openvidu 객체 : " + openvidu);
        System.out.println("----------------------------------------------------");
    }

    @PostMapping("/api/v1/sessions")
    @ApiResponse(responseCode = "200",
            description = "[세션 생성 성공] 생성된 세션객체의 ID를 반환",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = String.class)))
    @Operation(summary = "세션 생성", description = "세션 설정 정보를 인자로 받아 화상통화에 접근할 수 있는 세션을 생성하고 반환한다")
    public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {
        System.out.println("---------------오픈비두 신규 세션 생성-----------------");
        // 설정한 세션
        SessionProperties properties = SessionProperties.fromJson(params).build();
        System.out.println("세션 설정 정보 : " + properties);

        // 활성화된 세션 목록에 만든 세션 id를 올림
        Session session = openvidu.createSession(properties);
        System.out.println("만든 세션 정보 : " + session);
        System.out.println("---------------------------------------------");
        return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
    }


    @PostMapping("/api/v1/sessions/{sessionId}/connections")
    @Operation(summary = "연결 생성", description = "지정된 세션 ID에 대한 새로운 연결을 생성하고 토큰을 반환한다")
    @ApiResponse(responseCode = "200", description = "[연결 생성 성공] 연결에 접근할 수 있는 토큰 반환", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    @ApiResponse(responseCode = "404", description = "세션을 찾을 수 없음")
    public ResponseEntity<String> createConnection(@Parameter(description = "세션 ID") @PathVariable("sessionId") String sessionId,
                                                   @RequestBody(required = false) Map<String, Object> params)
            throws OpenViduJavaClientException, OpenViduHttpException {

        // 내가 연결한 openvidu 서버내에 활성화된 session을 sessionID를 찾는다
        Session session = openvidu.getActiveSession(sessionId);

        // 세션 없는 경우 처리
        if (session == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        System.out.println("----------------- 신규 Connetction 생성-----------------------");
        ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
        Connection connection = session.createConnection(properties);
        System.out.println("connection = " + connection);
        System.out.println("properties = " + properties);
        System.out.println("Token = " + connection.getToken());
        System.out.println("-----------------------------------------------------------");
        return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
    }


}
