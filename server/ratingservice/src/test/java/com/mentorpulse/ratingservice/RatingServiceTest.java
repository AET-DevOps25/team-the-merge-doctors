package com.mentorpulse.ratingservice;
import com.mentorpulse.ratingservice.models.Rating;
import com.mentorpulse.ratingservice.repositories.RatingRepository;
import com.mentorpulse.ratingservice.services.RatingService;
import com.mentorpulse.ratingservice.dto.MentorAverageRating;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class RatingServiceTest {

    @Mock
    private RatingRepository ratingRepository;

    @InjectMocks
    private RatingService ratingService;

    @Nested
    @DisplayName("rateMentor")
    class RateMentorTests {
        @Test
        void savesAndReturnsRating() {
            UUID mid = UUID.randomUUID();
            UUID meid = UUID.randomUUID();
            double value = 4.5;
            String message = "Great mentor!";

            Rating toSave = Rating.builder()
                    .mentorId(mid)
                    .menteeId(meid)
                    .rating(value)
                    .message(message)
                    .build();
            Rating saved = Rating.builder()
                    .id(UUID.randomUUID())
                    .mentorId(mid)
                    .menteeId(meid)
                    .rating(value)
                    .message(message)
                    .build();

            when(ratingRepository.save(any(Rating.class))).thenReturn(saved);

            Rating result = ratingService.rateMentor(mid, meid, value, message);
            assertThat(result).isEqualTo(saved);
            verify(ratingRepository).save(toSave);
        }
    }

    @Nested
    @DisplayName("getRatingsByMentorId")
    class GetRatingsByMentorIdTests {
        @Test
        void returnsListFromRepository() {
            UUID mid = UUID.randomUUID();
            List<Rating> list = List.of(new Rating());
            when(ratingRepository.findAllByMentorId(mid)).thenReturn(list);

            List<Rating> result = ratingService.getRatingsByMentorId(mid);
            assertThat(result).isSameAs(list);
        }
    }

    @Nested
    @DisplayName("getAverageRating")
    class GetAverageRatingTests {
        @Test
        void whenRatingsExist_returnsAverage() {
            UUID mid = UUID.randomUUID();
            when(ratingRepository.findAverageRatingByMentor(mid)).thenReturn(3.7);

            MentorAverageRating avg = ratingService.getAverageRating(mid);
            assertThat(avg.getMentorId()).isEqualTo(mid);
            assertThat(avg.getAverageRating()).isEqualTo(3.7);
        }

        @Test
        void whenNoRatings_returnsZero() {
            UUID mid = UUID.randomUUID();
            when(ratingRepository.findAverageRatingByMentor(mid)).thenReturn(null);

            MentorAverageRating avg = ratingService.getAverageRating(mid);
            assertThat(avg.getMentorId()).isEqualTo(mid);
            assertThat(avg.getAverageRating()).isEqualTo(0.0);
        }
    }
}
