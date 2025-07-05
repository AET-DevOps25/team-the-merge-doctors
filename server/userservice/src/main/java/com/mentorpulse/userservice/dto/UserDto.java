package com.mentorpulse.userservice.dto;

import com.mentorpulse.userservice.models.Address;
import com.mentorpulse.userservice.models.Contact;
import com.mentorpulse.userservice.models.Name;
import com.mentorpulse.userservice.models.RoleType;

import java.time.Instant;
import java.util.UUID;

public record UserDto(
        UUID id,
        String userName,
        Name name,
        Address address,
        Contact contact,
        RoleType role,
        Instant createdAt,
        Instant lastLoginAt) {}
