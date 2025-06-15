package com.mentorpulse.mentorshipservice.dto;

import com.mentorpulse.mentorshipservice.models.Skill;

import java.util.List;

public record ListSkillResponse(List<Skill> skills) {
}
