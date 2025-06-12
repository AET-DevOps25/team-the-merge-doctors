package com.mentorpulse.userservice.dto;

import java.util.UUID;

public record CreateUserResponse(UUID userId, String token) { }
