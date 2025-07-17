package com.mentorpulse.mentorshipservice.client;

import com.mentorpulse.mentorshipservice.dto.client.SummarizationRequest;
import com.mentorpulse.mentorshipservice.dto.client.SummarizationResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
public class SummarizationClient {

    private final RestTemplate restTemplate;

    public SummarizationClient(RestTemplate restTemplate) {
        this.restTemplate = restTemplate;
    }

    public SummarizationResponse summarize(String text) {
        SummarizationRequest req = new SummarizationRequest(text);
        ResponseEntity<SummarizationResponse> resp =
                restTemplate.postForEntity("/summarize", req, SummarizationResponse.class);
        return resp.getBody();
    }

    public List<SummarizationResponse> getHistory() {
        ResponseEntity<SummarizationResponse[]> resp =
                restTemplate.getForEntity("/summarize/history", SummarizationResponse[].class);
        return Arrays.asList(resp.getBody());
    }
}
