package com.mentorpulse.userservice.dto;

import com.mentorpulse.userservice.models.Address;
import com.mentorpulse.userservice.models.Contact;
import com.mentorpulse.userservice.models.Name;
import com.mentorpulse.userservice.models.RoleType;

public record CreateUserRequest(
        String id,
        String userName,
        String password,
        Name name,
        Contact contact,
        Address address,
        // MENTOR, MENTEE
        RoleType roleType) {}
