package com.mentorpulse.mentorshipservice.dto.service;

import com.mentorpulse.mentorshipservice.models.MentorProfile;

import java.util.List;

public record ListMentorProfileResponse (List<MentorProfile> mentorProfiles) { }
