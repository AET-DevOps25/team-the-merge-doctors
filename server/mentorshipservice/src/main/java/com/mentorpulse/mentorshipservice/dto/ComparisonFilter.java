package com.mentorpulse.mentorshipservice.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ComparisonFilter {
    private ComparisonOperator operator;
    private Integer value;
}
