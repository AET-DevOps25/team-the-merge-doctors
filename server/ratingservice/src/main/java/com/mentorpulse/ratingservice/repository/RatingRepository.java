package com.mentorpulse.ratingservice.repository;

import com.mentorpulse.ratingservice.models.Rating;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RatingRepository extends JpaRepository<Rating, UUID> {

    List<Rating> findAllByMentorId(UUID mentorId);

    @Query("""
        SELECT COALESCE(AVG(r.rating), 0)
          FROM Rating r
         WHERE r.mentorId = :mentorId
             """)
    Double findAverageRatingByMentor(UUID mentorId);
}
