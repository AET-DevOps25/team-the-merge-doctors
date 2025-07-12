package com.mentorpulse.ratingservice.models;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "ratings_table")
public class Rating {

    @Id
    @GeneratedValue
    UUID id;

    UUID mentorId;

    UUID menteeId;

    Double rating;

    @Column(columnDefinition = "text")
    String message;
}
