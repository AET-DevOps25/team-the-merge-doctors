package com.mentorpulse.userservice;

import io.jsonwebtoken.security.Keys;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Primary;

import java.nio.charset.StandardCharsets;
import java.security.Key;

@TestConfiguration
public class JwtTestConfig {
    @Bean
    @Primary
    public Key jwtSigningKey() {
        String testSecret = "0123456789ABCDEF0123456789ABCDEF";
        return Keys.hmacShaKeyFor(testSecret.getBytes(StandardCharsets.UTF_8));
    }
}