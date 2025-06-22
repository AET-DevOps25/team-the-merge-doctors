package com.mentorpulse.mentorshipservice.dto;

import java.util.List;
import java.util.UUID;

public record ListApplicationRequest(
    List<UUID> mentors,
    List<UUID> mentees
) { }
