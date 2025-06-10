package com.mentorpulse.appointmentservice.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/appointment")
public class AppointmentController {

    @GetMapping
    public String hello() {
        return "Hello from appointment service";
    }

}
