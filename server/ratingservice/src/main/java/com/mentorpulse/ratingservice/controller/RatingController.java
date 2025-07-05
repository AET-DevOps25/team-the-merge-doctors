package com.mentorpulse.ratingservice.controller;

import com.mentorpulse.ratingservice.dto.MentorAverageRating;
import com.mentorpulse.ratingservice.models.Rating;
import com.mentorpulse.ratingservice.services.RatingService;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/rating")
@RequiredArgsConstructor
@Validated
public class RatingController {

    private final RatingService ratingService;

    @PostMapping
    public ResponseEntity<Rating> rateMentor(@RequestBody @NotNull Rating request) {
        Rating rating = ratingService.rateMentor(
                request.getMentorId(),
                request.getMenteeId(),
                request.getRating(),
                request.getMessage()
        );
        return new ResponseEntity<>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/mentor/{mentorId}/ratings")
    public ResponseEntity<List<Rating>> getRatingsByMentor(@PathVariable UUID mentorId) {
        List<Rating> ratings = ratingService.getRatingsByMentorId(mentorId);
        return ResponseEntity.ok(ratings);
    }

    @GetMapping("/mentor/{mentorId}/average")
    public ResponseEntity<MentorAverageRating> getAverageRating(@PathVariable UUID mentorId) {
        MentorAverageRating dto = ratingService.getAverageRating(mentorId);
        return ResponseEntity.ok(dto);
    }

}