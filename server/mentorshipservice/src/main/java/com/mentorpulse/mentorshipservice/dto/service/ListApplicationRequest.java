package com.mentorpulse.mentorshipservice.dto.service;

import java.util.List;
import java.util.UUID;

public record ListApplicationRequest(
    List<UUID> mentors,
    List<UUID> mentees
) { }
