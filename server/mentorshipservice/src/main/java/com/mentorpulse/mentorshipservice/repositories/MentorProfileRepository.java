package com.mentorpulse.mentorshipservice.repositories;

import com.mentorpulse.mentorshipservice.dto.ComparisonFilter;
import com.mentorpulse.mentorshipservice.dto.ListMentorProfileRequest;
import com.mentorpulse.mentorshipservice.models.*;
import com.mentorpulse.mentorshipservice.models.MentorProfile;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

import static com.mentorpulse.mentorshipservice.dto.ComparisonOperator.*;

@Repository
public interface MentorProfileRepository extends CrudRepository<MentorProfile, UUID>, JpaSpecificationExecutor<MentorProfile> {

    Boolean existsMentorProfileByMentorId(UUID mentorId);

    static Specification<MentorProfile> createMentorProfileSpecification(ListMentorProfileRequest request) {
        return Specification.allOf(
                categoryFilter(request.categoryIds()),
                skillFilter(request.skillIds()),
                yearsFilter(request.yearsOfExperienceFilter()));
    }

    private static Specification<MentorProfile> categoryFilter(List<UUID> categoryIds) {
        return (root, query, builder) -> {
            if (categoryIds == null || categoryIds.isEmpty()) {
                return builder.conjunction();
            }
            return root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.CATEGORY).get(Category_.ID).in(categoryIds);
        };
    }

    private static Specification<MentorProfile> skillFilter(List<UUID> skillIds) {
        return (root, query, builder) -> {
            if (skillIds == null || skillIds.isEmpty()) {
                return builder.conjunction();
            }
            Join<Object, Object> skillJoin = root.join(MentorProfile_.SKILLS);
            return skillJoin.get(Skill_.ID).in(skillIds);
        };
    }

    private static Specification<MentorProfile> yearsFilter(ComparisonFilter yearsFilter) {
        return (root, query, builder) -> {
            if (yearsFilter == null || yearsFilter.getValue() == null) {
                return builder.conjunction();
            }
            return switch (yearsFilter.getOperator()) {
                case GREATER_THAN -> builder.greaterThan(root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.YEARS_OF_EXPERIENCE), yearsFilter.getValue());
                case GREATER_THAN_OR_EQUAL -> builder.greaterThanOrEqualTo(root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.YEARS_OF_EXPERIENCE), yearsFilter.getValue());
                case LESS_THAN -> builder.lessThan(root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.YEARS_OF_EXPERIENCE), yearsFilter.getValue());
                case LESS_THAN_OR_EQUAL -> builder.lessThanOrEqualTo(root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.YEARS_OF_EXPERIENCE), yearsFilter.getValue());
                case EQUAL -> builder.equal(root.get(MentorProfile_.MENTOR_CATEGORY).get(MentorCategory_.YEARS_OF_EXPERIENCE), yearsFilter.getValue());
            };
        };
    }
}
