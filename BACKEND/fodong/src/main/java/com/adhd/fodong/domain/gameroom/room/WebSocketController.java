package com.adhd.fodong.domain.gameroom.room;

import com.adhd.fodong.domain.gameroom.room.entitiy.Greeting;
import com.adhd.fodong.domain.gameroom.room.entitiy.HelloMessage;
import com.adhd.fodong.domain.gameroom.room.entitiy.InfoForOpenvidu;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

@Controller
public class WebSocketController {

    @MessageMapping("/hello")   // 클라이언트로부터 /toServer/hello 경로로 메시지가 날아오면 greeting 메서드가 실행될거임 즉, 메서드의 엔드포인트인셈
    @SendTo("/toClient/greetings")  // 이 메서드의 return 을 SendTo의 경로로 클라이언트에게 전달될거임
    public Greeting greeting(HelloMessage message) throws Exception {
        Thread.sleep(1000); // simulated delay
        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
    }


    // 동화구연 동시진입
//    @MessageMapping("/ready/{roomId}")  //toServer/ready/roomIdg
//    @SendTo("/toClient/readyRoom/{roomId}")
//    public InfoForOpenvidu enterViduTogether() throws Exception {
//        return InfoForOpenvidu;
//    }
}
