package com.mentorpulse.mentorshipservice.services;

import com.mentorpulse.mentorshipservice.client.SummarizationClient;
import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.ResourceNotFoundException;
import com.mentorpulse.mentorshipservice.models.ApplicationStatus;
import com.mentorpulse.mentorshipservice.models.MentorApplication;
import com.mentorpulse.mentorshipservice.models.MentorSession;
import com.mentorpulse.mentorshipservice.models.SessionStatus;
import com.mentorpulse.mentorshipservice.repositories.MentorApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
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
    private final SummarizationClient summarizationClient;

    @Transactional
    public CreateApplicationResponse createApplication(CreateApplicationRequest request) {
        MentorApplication.MentorApplicationBuilder mentorApplicationBuilder = MentorApplication.builder()
                .mentorId(request.mentorId())
                .menteeId(request.menteeId())
                .status(ApplicationStatus.PENDING)
                .applicationMessage(request.applicationMessage());
        if (!ObjectUtils.isEmpty(request.applicationMessage()) && !ObjectUtils.isEmpty(request.applicationMessage().trim())) {
            String summarizedApplicationText = summarizationClient.summarize(request.applicationMessage()).summarizedText();
            mentorApplicationBuilder.summarizedApplicationText(summarizedApplicationText);
        }
        MentorApplication mentorApplication = mentorApplicationRepository.save(mentorApplicationBuilder.build());
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
