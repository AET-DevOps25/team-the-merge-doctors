package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Skill {

    @Id
    @GeneratedValue
    UUID id;

    String name;

}
