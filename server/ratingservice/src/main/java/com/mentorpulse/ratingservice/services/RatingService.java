package com.mentorpulse.ratingservice.services;

import com.mentorpulse.ratingservice.dto.MentorAverageRating;
import com.mentorpulse.ratingservice.models.Rating;
import com.mentorpulse.ratingservice.repositories.RatingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class RatingService {

    private final RatingRepository ratingRepository;


    @Transactional
    public Rating rateMentor(UUID mentorId, UUID menteeId, Double ratingValue, String message) {
        Rating rating = Rating.builder()
                .mentorId(mentorId)
                .menteeId(menteeId)
                .rating(ratingValue)
                .message(message)
                .build();
        return ratingRepository.save(rating);
    }


    @Transactional(readOnly = true)
    public List<Rating> getRatingsByMentorId(UUID mentorId) {
        return ratingRepository.findAllByMentorId(mentorId);
    }

    @Transactional(readOnly = true)
    public MentorAverageRating getAverageRating(UUID mentorId) {
        Double avg = ratingRepository.findAverageRatingByMentor(mentorId);
        return new MentorAverageRating(mentorId, avg != null ? avg : 0.0);
    }
}
