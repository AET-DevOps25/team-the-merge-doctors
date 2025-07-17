package com.mentorpulse.mentorshipservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.CsrfConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf(CsrfConfigurer::disable)  // Disable CSRF for REST API
            .addFilterBefore(new Rolefilter(), UsernamePasswordAuthenticationFilter.class)
            .authorizeHttpRequests(
                authorizeRequests -> authorizeRequests
                        .requestMatchers("/api/mentorship/**")
                        .hasAnyRole("MENTOR", "MENTEE")
                        .anyRequest().denyAll());

        return http.build();
    }
}
