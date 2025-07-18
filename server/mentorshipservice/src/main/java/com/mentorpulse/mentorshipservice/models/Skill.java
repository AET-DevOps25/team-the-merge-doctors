package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Getter
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "skills_table")
public class Skill {

    @Id
//    @GeneratedValue

    UUID id;

    String name;
}
