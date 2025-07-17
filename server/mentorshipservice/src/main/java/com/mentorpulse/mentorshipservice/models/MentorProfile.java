package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;
import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "mentor_profiles_table")
public class MentorProfile {

    @Id
    UUID id;

    @Column(unique = true, nullable = false)
    UUID mentorId;

    @Column(columnDefinition = "text")
    String bio;

    @ManyToMany
    Set<Skill> skills;

    Boolean isAvailable;

    @Embedded
    MentorCategory mentorCategory;


}
