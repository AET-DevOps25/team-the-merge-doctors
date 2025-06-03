package com.mentorpulse.userservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Role {

    @GeneratedValue
    @Id
    private UUID id;

    private RoleType roleType;

    @Column(columnDefinition = "text")
    private String description;
}
