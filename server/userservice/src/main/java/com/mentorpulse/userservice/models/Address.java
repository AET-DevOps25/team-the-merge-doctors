package com.mentorpulse.userservice.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@Embeddable
@NoArgsConstructor
@AllArgsConstructor
public class Address {

    @Column(columnDefinition = "text")
    private String city;

    @Column(columnDefinition = "text")
    private String country;
}
