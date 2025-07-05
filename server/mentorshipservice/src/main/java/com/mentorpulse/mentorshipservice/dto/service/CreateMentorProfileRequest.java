package com.mentorpulse.mentorshipservice.dto.service;

import com.mentorpulse.mentorshipservice.models.MentorProfile;

public record CreateMentorProfileRequest(
        MentorProfile mentorProfile
) { }
