package com.adhd.fodong.global.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfigV2 implements WebSocketMessageBrokerConfigurer {
    // stomp sub/pub 로 개선된 버전


    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // stomp 접속주소 url = /ws-stomp
        registry.addEndpoint("/ws-stomp")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        // 메시지 구독 요청 url (메시지 받을 때)
        registry.enableSimpleBroker("/sub");

        // 메시지 발행 요청 url (메시지 보낼 때)
        registry.setApplicationDestinationPrefixes("/pub");
    }
}
