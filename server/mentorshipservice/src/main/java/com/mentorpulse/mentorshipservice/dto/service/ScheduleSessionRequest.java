package com.mentorpulse.mentorshipservice.dto.service;

import java.time.Instant;
import java.util.UUID;

public record ScheduleSessionRequest(
        UUID id,
        Instant startOn,
        Instant endOn
) {
}
