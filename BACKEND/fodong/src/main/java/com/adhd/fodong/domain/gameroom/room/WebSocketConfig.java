package com.adhd.fodong.domain.gameroom.room;

import com.adhd.fodong.global.jwt.JWTUtil;
import com.adhd.fodong.global.security.CustomUserDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.config.ChannelRegistration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.messaging.support.MessageHeaderAccessor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Autowired
    private JWTUtil jwtUtil;
    @Autowired
    private CustomUserDetailService customUserDetailService;

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // 요거는 클라이언트가 특정 소켓에 연결하고싶을떄
        registry.addEndpoint("/test/ws") // 소켓연결시 붙는 http(or https) 기본경로 나중에 nginx 리다이렉트 설정gd때 참고?
                .setAllowedOrigins(
                        "http://localhost:3000",
                        "http://192.168.0.13:3000",
                        "http://192.168.0.14:3000",
                        "http://172.30.1.64:3000",
                        "http://172.30.1.50:3000",
                        "http://172.30.1.93:3000",
                        "http://192.168.0.15:3000",
                        "http://192.168.0.11:3000",
                        "http://192.168.0.12:3000",
                        "http://192.168.0.20:3000",
                        "http://192.168.0.21:3000",
                        "http://192.168.0.22:3000",
                        "http://192.168.100.159:3000",
                        "http://192.168.100.158:3000",
                        "http://192.168.100.91:3000",
                        "https://i10c109.p.ssafy.io",
                        "http://i10c109.p.ssafy.io")
                .withSockJS();
        registry.addEndpoint("/ws") // 소켓연결시 붙는 http(or https) 기본경로 나중에 nginx 리다이렉트 설정gd때 참고?
                .setAllowedOrigins(
                        "http://localhost:3000",
                        "http://192.168.0.13:3000",
                        "https://i10c109.p.ssafy.io",
                        "http://i10c109.p.ssafy.io")
                .withSockJS();
    }

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/toClient"); // 서버가 해당 접두사를 사용하는 푸쉬를 클라이언트에게 전송
        config.setApplicationDestinationPrefixes("/toServer"); // 클라이언트가 서버로 요청보낼때 접두사
    }



    // 스프링 시큐리티 기반으로 특정 사용자찾기
    @Override
    public void configureClientInboundChannel(ChannelRegistration registration) {
        registration.interceptors(new ChannelInterceptor() {
            @Override
            public Message<?> preSend(Message<?> message, MessageChannel channel) {
                StompHeaderAccessor accessor =
                        MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
                if (StompCommand.CONNECT.equals(accessor.getCommand())) {
                    String authToken = accessor.getFirstNativeHeader("Authorization");
                    if (authToken != null && authToken.startsWith("Bearer ")) {
                        String jwt = authToken.substring(7);
                        String username = jwtUtil.getAccountEmail(jwt);
                        if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                            UserDetails userDetails = customUserDetailService.loadUserByUsername(username);
                            if (jwtUtil.validateToken(jwt, userDetails)) {
                                UsernamePasswordAuthenticationToken authentication =
                                        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                                SecurityContextHolder.getContext().setAuthentication(authentication);
                            }
                        }
                    }
                }
                return message;
            }
        });
    }
}


