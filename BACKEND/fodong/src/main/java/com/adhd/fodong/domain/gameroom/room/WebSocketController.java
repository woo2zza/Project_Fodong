package com.adhd.fodong.domain.gameroom.room;

import com.adhd.fodong.domain.friend.dto.FriendRequest;
import com.adhd.fodong.domain.friend.entity.Friendship;
import com.adhd.fodong.domain.friend.service.FriendService;
import com.adhd.fodong.domain.gameroom.room.entitiy.Greeting;
import com.adhd.fodong.domain.gameroom.room.entitiy.HelloMessage;
import com.adhd.fodong.domain.gameroom.room.entitiy.InfoForOpenvidu;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequiredArgsConstructor
@Slf4j
public class WebSocketController {

    private final FriendService friendService;

    @MessageMapping("/friend-request")
    @SendTo("/toClient/friend-request-response")
    public Map<String, Object> handleFriendRequest(FriendRequest friendRequest) {
        HashMap<String, Object> response = new HashMap<>();

        try {
            switch (friendRequest.getAction()) {
                case "sendRequest":
                    // 친구 요청 전송 처리 로직
                    friendService.sendFriendRequest(friendRequest);
                    log.info(friendRequest.getAction());
                    response.put("action", friendRequest.getAction());
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("message", friendRequest.getFromProfileId() + " 님이 " + friendRequest.getToProfileId() + " 에게 친구 요청을 보냈습니다.");
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    break;
                case "accept":
                    // 친구 요청 수락 처리 로직
                    friendService.acceptFriendRequest(friendRequest);
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    response.put("message", "친구 요청이 수락되었습니다.");
                    break;
                case "reject":
                    // 친구 요청 거절 처리 로직
                    friendService.rejectFriendRequest(friendRequest);
                    response.put("fromProfileId", friendRequest.getFromProfileId());
                    response.put("toProfileId", friendRequest.getToProfileId()); // 클라이언트에서 기대하는 대상 프로필 ID
                    response.put("message", "친구 요청이 거절되었습니다.");
                    break;
                default:
                    response.put("message", "알 수 없는 요청입니다.");
                    break;
            }
            log.info("Friend request action processed successfully.");
        } catch (Exception e) {
            log.error("Error processing friend request action: ", e);
            response.put("message", "친구 요청 처리 중 오류가 발생했습니다.");
        }
        return response;
    }
}


//    @MessageMapping("/hello")   // 클라이언트로부터 /toServer/hello 경로로 메시지가 날아오면 greeting 메서드가 실행될거임 즉, 메서드의 엔드포인트인셈
//    @SendTo("/toClient/greetings")  // 이 메서드의 return 을 SendTo의 경로로 클라이언트에게 전달될거임
//    public Greeting greeting(HelloMessage message) throws Exception {
//        Thread.sleep(1000); // simulated delay
//        return new Greeting("Hello, " + HtmlUtils.htmlEscape(message.getName()) + "!");
//    }
