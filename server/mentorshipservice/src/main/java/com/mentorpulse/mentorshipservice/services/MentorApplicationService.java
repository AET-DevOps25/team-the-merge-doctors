package com.mentorpulse.mentorshipservice.services;

import com.mentorpulse.mentorshipservice.dto.*;
import com.mentorpulse.mentorshipservice.exceptions.ResourceNotFoundException;
import com.mentorpulse.mentorshipservice.models.ApplicationStatus;
import com.mentorpulse.mentorshipservice.models.MentorApplication;
import com.mentorpulse.mentorshipservice.models.MentorSession;
import com.mentorpulse.mentorshipservice.models.SessionStatus;
import com.mentorpulse.mentorshipservice.repositories.MentorApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MentorApplicationService {
    private final MentorApplicationRepository mentorApplicationRepository;

    @Transactional
    public CreateApplicationResponse createApplication(CreateApplicationRequest request) {
        // TODO: summarize application text using llm
        // TODO: add when the application happens
        MentorApplication mentorApplication =
                MentorApplication.builder()
                        .mentorId(request.mentorId())
                        .menteeId(request.menteeId())
                        .applicationMessage(request.applicationMessage())
                        .summarizedApplicationMessage(
                                "Every sunrise brings a new chance to grow and shine. Embrace the day with hope, and let your heart lead the way. Tomorrow is shaped by what you choose today.")
                        .status(ApplicationStatus.PENDING)
                        .build();
        mentorApplication = mentorApplicationRepository.save(mentorApplication);
        return new CreateApplicationResponse(mentorApplication);
    }

    @Transactional(readOnly = true)
    public ListApplicationResponse listApplications(UUID mentorId, UUID menteeId) {
        List<MentorApplication> applications =
                mentorApplicationRepository.findAll(
                        MentorApplicationRepository.createSpecification(mentorId, menteeId));
        return new ListApplicationResponse(applications);
    }

    @Transactional(readOnly = true)
    public Optional<MentorApplication> getApplication(UUID id) {
        return mentorApplicationRepository.findById(id);
    }

    @Transactional
    public MentorApplication acceptApplication(UUID applicationId)
            throws ResourceNotFoundException {
        MentorApplication application =
                mentorApplicationRepository
                        .findById(applicationId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Application not found: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException(
                    "Cannot accept application in state: " + application.getStatus());
        }

        application.setStatus(ApplicationStatus.ACCEPTED);

        MentorSession session = MentorSession.builder().status(SessionStatus.ACTIVE).build();

        application.setSession(session);
        return mentorApplicationRepository.save(application);
    }

    @Transactional
    public MentorApplication rejectApplication(UUID applicationId)
            throws ResourceNotFoundException {
        MentorApplication application =
                mentorApplicationRepository
                        .findById(applicationId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Application not found: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException(
                    "Cannot reject application in state: " + application.getStatus());
        }

        application.setStatus(ApplicationStatus.REJECTED);
        application.setSession(null);
        return mentorApplicationRepository.save(application);
    }

    @Transactional
    public MentorApplication scheduleSession(UUID applicationId, Instant startOn, Instant endOn)
            throws ResourceNotFoundException {
        MentorApplication application =
                mentorApplicationRepository
                        .findById(applicationId)
                        .orElseThrow(
                                () ->
                                        new ResourceNotFoundException(
                                                "Application not found: " + applicationId));

        if (application.getStatus() != ApplicationStatus.ACCEPTED) {
            throw new IllegalStateException(
                    "Cannot schedule session when application is in state: "
                            + application.getStatus());
        }

        MentorSession session = application.getSession();
        if (session == null) {
            session = MentorSession.builder().build();
            application.setSession(session);
        }

        session.setStartOn(startOn);
        session.setEndOn(endOn);
        session.setStatus(SessionStatus.SCHEDULED);

        return mentorApplicationRepository.save(application);
    }
}
