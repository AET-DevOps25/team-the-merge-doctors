package com.mentorpulse.mentorshipservice.controller;

import com.mentorpulse.mentorshipservice.dto.*;
import com.mentorpulse.mentorshipservice.exceptions.ResourceNotFoundException;
import com.mentorpulse.mentorshipservice.models.MentorApplication;
import com.mentorpulse.mentorshipservice.services.MentorApplicationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/mentorship")
@RequiredArgsConstructor
public class MentorApplicationController {

    private final MentorApplicationService mentorApplicationService;

    @PostMapping("/createApplication")
    public ResponseEntity<CreateApplicationResponse> createApplication(@RequestBody @Valid CreateApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(mentorApplicationService.createApplication(request));
    }

    @PostMapping("/listApplication")
    public ResponseEntity<ListApplicationResponse> listApplication(@RequestBody @Valid ListApplicationRequest request) {
        return ResponseEntity.status(HttpStatus.OK).body(mentorApplicationService.listApplication(request));
    }

    @GetMapping("/application/{id}")
    public ResponseEntity<GetApplicationResponse> getApplication(@PathVariable("id") UUID id) {
        Optional<MentorApplication> applicationOptional = mentorApplicationService.getApplication(id);
        return applicationOptional.map(application -> ResponseEntity.ok(new GetApplicationResponse(application)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/acceptApplication/{id}")
    public ResponseEntity<AcceptApplicationResponse> acceptApplication(@PathVariable UUID id) {
        try {
            MentorApplication updated = mentorApplicationService.acceptApplication(id);
            return ResponseEntity.ok(new AcceptApplicationResponse(updated));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/rejectApplication/{id}")
    public ResponseEntity<RejectApplicationResponse> rejectApplication(@PathVariable UUID id) {
        try {
            MentorApplication updated = mentorApplicationService.rejectApplication(id);
            return ResponseEntity.ok(new RejectApplicationResponse(updated));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

    @PutMapping("/scheduleSession")
    public ResponseEntity<ScheduleSessionResponse> scheduleSession(
            @RequestBody ScheduleSessionRequest request
    ) {
        try {
            MentorApplication updated = mentorApplicationService.scheduleSession(
                    request.id(),
                    request.startOn(),
                    request.endOn()
            );
            return ResponseEntity.ok(new ScheduleSessionResponse(updated));
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
    }

}
