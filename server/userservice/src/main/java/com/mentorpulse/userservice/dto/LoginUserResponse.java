package com.mentorpulse.userservice.dto;

public record LoginUserResponse(Boolean authenticated, String token, UserDto user) {}
