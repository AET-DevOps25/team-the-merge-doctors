package com.mentorpulse.userservice.services;

import com.mentorpulse.userservice.models.RoleType;
import com.mentorpulse.userservice.repositories.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

@Service
public class AuthenticationService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    Key privateKey;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    public String generateToken(String username, UUID userId, RoleType role) {
        // 5 hours
        final long EXPIRATION_MS = 1000 * 60 * 60 * 5;
        return Jwts
                .builder()
                .subject(username)
                .claim("userId", userId.toString())
                .claim("role", role.name())
                .expiration(new Date(new Date().getTime() + EXPIRATION_MS))
                .signWith(privateKey)
                .compact();
    }

    public boolean isTokenValid(String token, String username) {
        final String tokenUser = extractAllClaims(token).getSubject();
        return (tokenUser.equals(username) && !isTokenExpired(token));
    }




    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .setSigningKey(privateKey)
                .build()
                .parseSignedClaims(token)
                .getBody();
    }
}
