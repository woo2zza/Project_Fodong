package com.adhd.fodong.domain.gameroom.room;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 요거는 클라이언트가 특정 소켓에 연결하고싶을떄
        registry.addEndpoint("/test/ws") // 소켓연결시 붙는 http(or https) 기본경로 나중에 nginx 리다이렉트 설정gd때 참고?
                .setAllowedOrigins(
                        "http://192.168.0.13:3000",
                        "http://localhost:3000")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/toClient"); // 서버가 해당 접두사를 사용하는 푸쉬를 클라이언트에게 전송
        config.setApplicationDestinationPrefixes("/toServer"); // 클라이언트가 서버로 요청보낼때 접두사
    }
}


