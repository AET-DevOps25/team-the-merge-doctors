package com.mentorpulse.mentorshipservice.controller;

import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.AlreadyExistsException;
import com.mentorpulse.mentorshipservice.exceptions.InvalidArgumentsException;
import com.mentorpulse.mentorshipservice.exceptions.NotFoundException;
import com.mentorpulse.mentorshipservice.services.MentorProfileService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.UUID;

import javax.management.InvalidAttributeValueException;

@RestController
@RequestMapping("/api/mentorship")
@RequiredArgsConstructor
public class MentorProfileController {

    private final MentorProfileService mentorProfileService;

    @PostMapping("/createSkill")
    public ResponseEntity<CreateSkillResponse> createSkill(
            @RequestBody @Valid CreateSkillRequest request) {
        try {
            CreateSkillResponse response = mentorProfileService.createSkill(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (InvalidArgumentsException | AlreadyExistsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/listSkills")
    public ResponseEntity<ListSkillResponse> listSkills() {
        return ResponseEntity.status(HttpStatus.OK).body(mentorProfileService.listSkills());
    }

    @PostMapping("/createCategory")
    public ResponseEntity<CreateCategoryResponse> createCategory(
            @RequestBody @Valid CreateCategoryRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(mentorProfileService.createCategory(request));
        } catch (InvalidArgumentsException | AlreadyExistsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/listCategories")
    public ResponseEntity<ListCategoryResponse> listCategories() {
        return ResponseEntity.status(HttpStatus.OK).body(mentorProfileService.listCategories());
    }

    @PostMapping("/createMentorProfile")
    public ResponseEntity<CreateMentorProfileResponse> createMentorProfile(
            @RequestBody @Valid CreateMentorProfileRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(mentorProfileService.createMentorProfile(request));
        } catch (AlreadyExistsException | InvalidArgumentsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PatchMapping("/updateMentorProfile")
    public ResponseEntity<UpdateMentorProfileResponse> updateMentorProfile(
            @RequestBody @Valid UpdateMentorProfileRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(mentorProfileService.updateMentorProfile(request));
        } catch (InvalidAttributeValueException | InvalidArgumentsException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/getMentorProfile")
    public ResponseEntity<GetMentorProfileResponse> getMentorProfile(@RequestParam UUID mentorId) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(mentorProfileService.getMentorProfile(mentorId));
        } catch (InvalidArgumentsException | NotFoundException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PostMapping("/listMentorProfiles")
    public ResponseEntity<ListMentorProfileResponse> listMentorProfiles(
            @RequestBody @Valid ListMentorProfileRequest request) {
        return ResponseEntity.status(HttpStatus.OK)
                .body(mentorProfileService.listMentorProfiles(request));
    }

    @DeleteMapping("/deleteMentorProfile")
    public ResponseEntity<DeleteMentorProfileResponse> deleteMentorProfile(
            @RequestBody @Valid DeleteMentorProfileRequest request) {
        try {
            return ResponseEntity.status(HttpStatus.OK)
                    .body(mentorProfileService.deleteMentorProfile(request));
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }
}
