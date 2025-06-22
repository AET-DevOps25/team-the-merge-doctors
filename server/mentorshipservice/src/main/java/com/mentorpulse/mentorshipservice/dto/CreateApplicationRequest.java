package com.mentorpulse.mentorshipservice.dto;

import java.util.UUID;

public record CreateApplicationRequest(UUID mentorId, UUID menteeId, String applicationMessage) { }
