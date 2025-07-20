package com.mentorpulse.mentorshipservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        String securityEnabled = System.getenv("AUTHORIZATION_ENABLED");

        if ("true".equalsIgnoreCase(securityEnabled)) {
            http.csrf(CsrfConfigurer::disable)
                .authorizeHttpRequests(
                    authorizeRequests -> authorizeRequests
                        .requestMatchers(
                            "/api/mentorship/createSkill",
                            "/api/mentorship/createMentorProfile",
                        ).permitAll()
                        .requestMatchers("/api/mentorship/**").hasAnyRole("MENTOR", "MENTEE")
                        .anyRequest().authenticated());
        } else {
            http.csrf(CsrfConfigurer::disable)
                .authorizeHttpRequests(
                    authorizeRequests -> authorizeRequests
                        .anyRequest().permitAll());
        }

        return http.build();
    }
}
