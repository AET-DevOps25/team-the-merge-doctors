package com.mentorpulse.userservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;


@Embeddable
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Name {

    @Column(columnDefinition = "text")
    String title;

    @Column(columnDefinition = "text")
    String firstName;

    @Column(columnDefinition = "text")
    String middleName;

    @Column(columnDefinition = "text")
    String lastName;


}
