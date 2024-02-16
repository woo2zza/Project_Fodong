package com.adhd.fodong.global.jwt;

import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
@PropertySource("classpath:private/keys.properties")
public class JWTUtil {
    private SecretKey secretKey;

    public JWTUtil(@Value("${secret-Key}")String secret) {

        secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8),
                Jwts
                        .SIG
                        .HS256
                        .key()
                        .build()
                        .getAlgorithm());
    }

    public String getAccountEmail(String token) {
        return Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .get("accountEmail", String.class);
    }

    public Boolean isExpired(String token) {

        return Jwts
                .parser()
                .verifyWith(secretKey)
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getExpiration()
                .before(new Date());
    }

    public String createJwt(String accountEmail, Long expiredMs) {

        return Jwts.builder()
                .claim("accountEmail", accountEmail)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        final String username = getAccountEmail(token);
        return (username.equals(userDetails.getUsername()) && !isExpired(token));
    }

}
