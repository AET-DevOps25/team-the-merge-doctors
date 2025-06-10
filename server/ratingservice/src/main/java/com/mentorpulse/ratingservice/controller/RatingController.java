package com.mentorpulse.ratingservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/rating")
public class RatingController {

    @GetMapping
    public String hello() {
        return "Hello from rating service";
    }

}