package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Embeddable
@Data
public class MentorCategory {

    @OneToOne(cascade = CascadeType.ALL, orphanRemoval = true)
    Category category;

    Integer yearsOfExperience;
}
