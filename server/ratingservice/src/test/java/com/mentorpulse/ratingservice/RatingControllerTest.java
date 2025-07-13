package com.mentorpulse.ratingservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentorpulse.ratingservice.controller.RatingController;
import com.mentorpulse.ratingservice.models.Rating;
import com.mentorpulse.ratingservice.services.RatingService;
import com.mentorpulse.ratingservice.dto.MentorAverageRating;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import java.util.List;
import java.util.UUID;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(RatingController.class)
@AutoConfigureMockMvc(addFilters = false)
class RatingControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private RatingService ratingService;

    @Nested
    @DisplayName("POST /rateMentor")
    class RateMentorTests {
        @Test
        void returns201WithRating() throws Exception {
            UUID mid = UUID.randomUUID();
            UUID meid = UUID.randomUUID();
            Rating req = Rating.builder()
                    .mentorId(mid)
                    .menteeId(meid)
                    .rating(5.0)
                    .message("Good")
                    .build();
            Rating saved = Rating.builder()
                    .id(UUID.randomUUID())
                    .mentorId(mid)
                    .menteeId(meid)
                    .rating(5.0)
                    .message("Good")
                    .build();
            when(ratingService.rateMentor(mid, meid, 5.0, "Good")).thenReturn(saved);

            mockMvc.perform(post("/api/rating/rateMentor")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.id").value(saved.getId().toString()));
        }
    }

    @Nested
    @DisplayName("GET /mentor/{mentorId}/ratings")
    class GetRatingsByMentorTests {
        @Test
        void returns200WithRatings() throws Exception {
            UUID mid = UUID.randomUUID();
            List<Rating> list = List.of(new Rating());
            when(ratingService.getRatingsByMentorId(mid)).thenReturn(list);

            mockMvc.perform(get("/api/rating/mentor/{mentorId}/ratings", mid))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$[0]").exists());
        }
    }

    @Nested
    @DisplayName("GET /mentor/{mentorId}/average")
    class GetAverageRatingTests {
        @Test
        void returns200WithAverage() throws Exception {
            UUID mid = UUID.randomUUID();
            MentorAverageRating dto = new MentorAverageRating(mid, 4.2);
            when(ratingService.getAverageRating(mid)).thenReturn(dto);

            mockMvc.perform(get("/api/rating/mentor/{mentorId}/average", mid))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.averageRating").value(4.2));
        }
    }
}
