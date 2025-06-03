package com.mentorpulse.userservice.dto;

import com.mentorpulse.userservice.models.User;

import java.util.List;

public record ListUsersResponse(List<User> users) { }
