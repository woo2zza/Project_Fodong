package com.adhd.fodong.global.jwt;

import com.adhd.fodong.global.dto.CustomUserDetails;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;


    public LoginFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }


    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        //데이터추출
        //클라이언트 로그인 시도 시,
        String accountEmail = request.getParameter("accountEmail");
        String accountPwd = request.getParameter("accountPwd");


        //스프링 시큐리티에서 accountEmail과 accountPassword를 검증하기 위해서는 token에 담아야 함
        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(accountEmail, accountPwd, null);
        //token에 담은 검증을 위한 AuthenticationManager로 전달
        return authenticationManager.authenticate(authToken);
    }


    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
        //로그인 성공시 실행하는 메소드 (여기서 JWT를 발급하면 됨)
        //UserDetails
        CustomUserDetails customUserDetails = (CustomUserDetails) authResult.getPrincipal();
        String accountEmail = customUserDetails.getUsername();
        int accountId = customUserDetails.getAccountId();

        String token = jwtUtil.createJwt(accountEmail, 60000 * 60 * 10L);

        System.out.println("-----------로그인 성공------------");
        System.out.println("accountEmail = " + accountEmail);
        System.out.println("accountId = " + accountId);
        System.out.println("token = " + token);
        System.out.println("---------------------------------");
        response.addHeader("Authorization", "Bearer " + token);

        PrintWriter out = response.getWriter();
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        out.print("{\"accountId\": " + accountId + "}");
        out.flush();

//        String redirectUrl = "/profile/" + accountId;
//        response.sendRedirect(redirectUrl);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        // 검증 실패시
        response.setStatus(401);
    }


}

