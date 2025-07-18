package com.mentorpulse.mentorshipservice.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Data
@Table(name = "categories_table")
public class Category {

    @Id
//    @GeneratedValue
    UUID id;

    String name;
}
