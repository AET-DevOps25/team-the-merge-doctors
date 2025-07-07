package com.mentorpulse.mentorshipservice.dto.service;

import java.util.UUID;

public record CreateApplicationRequest(UUID mentorId, UUID menteeId, String applicationMessage) { }
