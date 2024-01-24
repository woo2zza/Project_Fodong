package com.adhd.fodong.domains.webrtc.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
public class SignalingController {
    //시그널링 서버 컨트롤러
    //시그널링 서버는 미디어 전송을 위한 초기 설정과 메타데이터 중계 역할을 하는 서버

    //offer 정보를 주고 받기 위한 websocket
    //camKey : 각 요청하는 캠의 key , roomId : 룸 아이디

    @MessageMapping("/peer/offer/{camKey}/{roomId}")  //클라이언트->서버
    @SendTo("/topic/peer/offer/{camKey}/{roomId}")    //서버->클라이언트
    public String PeerHandleOffer(@Payload String offer,
                                  @DestinationVariable(value = "roomId") String roomId,
                                  @DestinationVariable(value = "camKey") String camKey) {


        log.info("[OFFER} {} : {}", camKey, offer);
        return offer;
    }

    //iceCandidate 정보를 주고 받기 위한 webSocket
    //camKey : 각 요청하는 캠의 key , roomId : 룸 아이디
    @MessageMapping("/peer/iceCandidate/{camKey}/{roomId}")
    @SendTo("/topic/peer/iceCandidate/{camKey}/{roomId")
    public String PeerHandleIceCandidate(@Payload String candidate,
                                         @DestinationVariable(value = "roomId") String roomId,
                                         @DestinationVariable(value = "camKey") String camKey) {

        log.info("[ICECANDIDATE] {} : {}", camKey, candidate);
        return candidate;
    }


    @MessageMapping("/peer/answer/{camKey}/{roomId}")
    @SendTo("/topic/peer/answer/{camKey}/{roomId}")
    public String PeerHandleAnswer(@Payload String answer,
                                   @DestinationVariable(value = "roomId") String roomId,
                                   @DestinationVariable(value = "camKey") String camKey) {
        log.info("[ANSWER] {} : {}", camKey, answer);
        return answer;
    }


    //camKey를 받기위해 신호를 보내는 webSocket
    @MessageMapping("/call/key")
    @SendTo("/topic/call/key")
    public String callKey(@Payload String message) {
        log.info("[Key] : {}", message);
        return message;
    }


    //자신의 camKey 를 모든 연결된 세션에 보내는 webSocket
    @MessageMapping("/send/key")
    @SendTo("/topic/send/key")
    public String sendKey(@Payload String message) {
        return message;
    }


}
