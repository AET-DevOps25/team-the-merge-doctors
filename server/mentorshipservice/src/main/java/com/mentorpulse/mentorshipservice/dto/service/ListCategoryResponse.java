package com.mentorpulse.mentorshipservice.dto.service;

import com.mentorpulse.mentorshipservice.models.Category;

import java.util.List;

public record ListCategoryResponse(List<Category> categories) {
}
