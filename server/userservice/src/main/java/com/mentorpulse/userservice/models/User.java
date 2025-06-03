package com.mentorpulse.userservice.models;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "user_table")
public class User {

    @GeneratedValue
    @Id
    private UUID id;

    @Column(unique = true)
    private String userName;

    @Column(columnDefinition = "text")
    private String passwordHash;

    @Embedded
    private Name name;

    @Embedded
    private Address address;

    @Embedded
    private Contact contact;

    @ManyToOne(cascade = CascadeType.ALL)
    private Role role;

    private Instant createdAt;

    private Instant lastLoginAt;
}
