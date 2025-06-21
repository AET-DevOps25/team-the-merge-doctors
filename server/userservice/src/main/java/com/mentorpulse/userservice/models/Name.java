package com.mentorpulse.userservice.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Embeddable
@Builder
@Getter
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
