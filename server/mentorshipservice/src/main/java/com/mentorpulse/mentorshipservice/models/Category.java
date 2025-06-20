package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
public class Category {

    @Id
//    @GeneratedValue
    UUID id;

    String name;
}
