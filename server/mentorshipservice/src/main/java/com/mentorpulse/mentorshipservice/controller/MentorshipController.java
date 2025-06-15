package com.mentorpulse.mentorshipservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/mentorship")
public class MentorshipController {

    @GetMapping
    public String hello() {
        return "Hello from mentorship service";
    }

}
