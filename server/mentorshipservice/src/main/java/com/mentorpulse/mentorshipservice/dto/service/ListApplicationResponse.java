package com.mentorpulse.mentorshipservice.dto.service;

import com.mentorpulse.mentorshipservice.models.MentorApplication;

import java.util.List;

public record ListApplicationResponse(
        List<MentorApplication> applications
) { }
