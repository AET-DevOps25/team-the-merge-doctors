package com.mentorpulse.userservice.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.jsonwebtoken.security.Keys;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.Key;

@Configuration
public class JWTKeyConfig {

    @Value("${jwt.secret.file}")
    private String secretFilePath;

    @Bean
    public Key jwtSigningKey() throws IOException {
        byte[] secretBytes = Files.readAllBytes(Paths.get(secretFilePath));
        String secret = new String(secretBytes, StandardCharsets.UTF_8).trim();
        return Keys.hmacShaKeyFor(secret.getBytes(StandardCharsets.UTF_8));
    }
}
