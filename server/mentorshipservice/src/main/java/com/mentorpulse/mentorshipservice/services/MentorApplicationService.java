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
        MentorApplication mentorApplication = MentorApplication.builder()
                .mentorId(request.mentorId())
                .menteeId(request.menteeId())
                .applicationMessage(request.applicationMessage())
                .build();
        mentorApplication = mentorApplicationRepository.save(mentorApplication);
        return new CreateApplicationResponse(mentorApplication);
    }

    @Transactional(readOnly = true)
    public ListApplicationResponse listApplication(ListApplicationRequest request) {
        List<MentorApplication> applications = mentorApplicationRepository.findAll(MentorApplicationRepository.createSpecification(request));
        return new ListApplicationResponse(applications);
    }

    @Transactional(readOnly = true)
    public Optional<MentorApplication> getApplication(UUID id) {
        return mentorApplicationRepository.findById(id);
    }

    @Transactional
    public MentorApplication acceptApplication(UUID applicationId) throws ResourceNotFoundException {
        MentorApplication application = mentorApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Application not found: " + applicationId));

        if (application.getStatus() != ApplicationStatus.PENDING) {
            throw new IllegalStateException(
                    "Cannot accept application in state: " + application.getStatus());
        }

        application.setStatus(ApplicationStatus.ACCEPTED);

        MentorSession session = MentorSession.builder()
                .status(SessionStatus.ACTIVE)
                .build();

        application.setSession(session);
        return mentorApplicationRepository.save(application);
    }

    @Transactional
    public MentorApplication rejectApplication(UUID applicationId) throws ResourceNotFoundException {
        MentorApplication application = mentorApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
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
    public MentorApplication scheduleSession(UUID applicationId, Instant startOn, Instant endOn) throws ResourceNotFoundException {
        MentorApplication application = mentorApplicationRepository.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException(
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
