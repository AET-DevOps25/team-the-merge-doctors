package com.mentorpulse.mentorshipservice.dto;

import com.mentorpulse.mentorshipservice.models.Category;

import java.util.List;

public record ListCategoryResponse(List<Category> categories) {
}
