package com.mentorpulse.mentorshipservice.config;

import org.gradle.internal.impldep.com.google.api.client.util.Value;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class LlmClientConfig {

    @Value("${genai.http-secured:false}")
    private boolean genaiHttpSecured;

    @Value("${genai.host}")
    private String host;

    @Value("${genai.port}")
    private String port;

    @Bean
    public RestTemplate restTemplate(RestTemplateBuilder builder) {
        String url = String.format("%s://%s:%s/api/genai",genaiHttpSecured ? "https": "http", host, port);
        System.out.println(url);
        return builder
                .rootUri(url)
                .build();
    }
}
