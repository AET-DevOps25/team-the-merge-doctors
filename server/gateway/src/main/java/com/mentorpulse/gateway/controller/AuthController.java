package com.mentorpulse.gateway.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import jakarta.servlet.http.HttpServletRequest;

@RestController
public class AuthController {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${services.user.url}")
    private String userServiceBaseUrl;

    @RequestMapping("/api/auth")
    public ResponseEntity<Void> authenticate(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        try {
            // Forward the request to user-service -> auth status endpoint
            // Internal service-to-service communication.
            String userServiceUrl = userServiceBaseUrl + "/api/user/auth/status";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Authorization", authHeader);

            HttpEntity<Void> entity = new HttpEntity<>(headers);

            ResponseEntity<Map> response = restTemplate.exchange(
                    userServiceUrl, HttpMethod.GET, entity, Map.class
            );

            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                Map<String, Object> body = response.getBody();
                Boolean valid = (Boolean) body.get("valid");

                if (Boolean.TRUE.equals(valid)) {
                    // Return success with user info in headers for downstream services
                    return ResponseEntity.ok()
                            .header("X-User-Id", (String) body.get("userId"))
                            .header("X-Username", (String) body.get("username"))
                            .header("X-User-Role", (String) body.get("role"))
                            .build();
                }
            } 
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        } catch(Exception e) {
            System.err.println("Error validating token: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
