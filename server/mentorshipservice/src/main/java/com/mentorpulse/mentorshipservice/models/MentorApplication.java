package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class MentorApplication {

    @Id @GeneratedValue UUID id;

    UUID mentorId;

    UUID menteeId;

    @Column(columnDefinition = "text")
    String applicationMessage;

    @Column(columnDefinition = "text")
    String summarizedApplicationMessage;

    ApplicationStatus status;

    Instant appliedOn;

    @Column(columnDefinition = "text")
    String summarizedApplicationText;

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    MentorSession session;
}
