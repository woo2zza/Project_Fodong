package com.adhd.fodong.global.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.config.annotation.*;

//@Configuration
@EnableWebSocket
@RequiredArgsConstructor
public class WebSocketConfigV1 implements WebSocketConfigurer {

    // WebScoketHandler 생성자 추가
    private final WebSocketHandler webSocketHandler;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        // endpoint: /ws/chat
        // 이를 통해서 ws://localhost:8080/ws/chat 으로 요청이 들어오면 websocket 통신을 진행한다.
        registry.addHandler(webSocketHandler, "/ws/chat")
                .setAllowedOrigins("*");  //
    }
}
