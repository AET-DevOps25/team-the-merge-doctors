package com.mentorpulse.userservice.models;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Contact {

    @Column(columnDefinition = "text")
    private String email;

    @Column(columnDefinition = "text")
    private String phoneNumber;

    @Column(columnDefinition = "text")
    private String mobileNumber;

}
