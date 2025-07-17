package com.mentorpulse.mentorshipservice.dto.client;

import java.time.LocalDateTime;

public record SummarizationResponse (
        Long id,
        String textToSummarize,
        String summarizedText,
        LocalDateTime timestamp
) { }
