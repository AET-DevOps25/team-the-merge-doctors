package com.mentorpulse.mentorshipservice.dto;

import com.mentorpulse.mentorshipservice.models.MentorProfile;

import java.util.List;

public record ListMentorProfileResponse (List<MentorProfile> mentorProfile) { }
