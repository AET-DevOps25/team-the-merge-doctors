package com.mentorpulse.mentorshipservice.config;

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
        String url;
        if (genaiHttpSecured) {
            url = String.format("https://%s/api/genai", host);
        } else {
            url = String.format("http://%s:%s/api/genai", host, port);
        }
        System.out.println(url);
        return builder
                .rootUri(url)
                .build();
    }
}
