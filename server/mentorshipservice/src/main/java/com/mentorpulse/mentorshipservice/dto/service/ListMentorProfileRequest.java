package com.mentorpulse.mentorshipservice.dto.service;

import java.util.List;
import java.util.UUID;

public record ListMentorProfileRequest(
        List<UUID> categoryIds,
        List<UUID> skillIds,
        ComparisonFilter yearsOfExperienceFilter) { }
