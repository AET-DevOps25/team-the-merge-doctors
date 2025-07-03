package com.mentorpulse.mentorshipservice.repositories;

import com.mentorpulse.mentorshipservice.dto.ListApplicationRequest;
import com.mentorpulse.mentorshipservice.models.MentorApplication;
import com.mentorpulse.mentorshipservice.models.MentorApplication_;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.UUID;

public interface MentorApplicationRepository
        extends CrudRepository<MentorApplication, UUID>,
                JpaSpecificationExecutor<MentorApplication> {

    static Specification<MentorApplication> createSpecification(UUID mentorId, UUID menteeId) {
        return Specification.allOf(mentorIn(List.of(mentorId)), menteeIn(List.of(menteeId)));
    }

    private static Specification<MentorApplication> mentorIn(List<UUID> mentors) {
        return (root, query, criteriaBuilder) -> {
            if (ObjectUtils.isEmpty(mentors)) {
                return criteriaBuilder.conjunction();
            }
            return root.get(MentorApplication_.MENTOR_ID).in(mentors);
        };
    }

    private static Specification<MentorApplication> menteeIn(List<UUID> mentees) {
        return (root, query, criteriaBuilder) -> {
            if (ObjectUtils.isEmpty(mentees)) {
                return criteriaBuilder.conjunction();
            }
            return root.get(MentorApplication_.MENTEE_ID).in(mentees);
        };
    }
}
