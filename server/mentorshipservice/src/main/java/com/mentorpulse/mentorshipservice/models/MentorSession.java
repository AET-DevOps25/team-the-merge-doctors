package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MentorSession {

    @Id
    @GeneratedValue
    UUID id;

    Instant startOn;

    Instant endOn;

    SessionStatus status;
}
