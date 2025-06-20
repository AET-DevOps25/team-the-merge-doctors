package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Embeddable;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;

@Embeddable
@Data
@Getter
public class MentorCategory {

    @ManyToOne(cascade = CascadeType.ALL)
    Category category;

    Integer yearsOfExperience;
}
