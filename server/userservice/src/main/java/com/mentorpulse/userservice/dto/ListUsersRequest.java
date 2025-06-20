package com.mentorpulse.userservice.dto;

import com.mentorpulse.userservice.models.RoleType;

public record ListUsersRequest(RoleType roleType) { }
