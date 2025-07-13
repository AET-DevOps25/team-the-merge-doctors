package com.mentorpulse.mentorshipservice;

import com.mentorpulse.mentorshipservice.client.SummarizationClient;
import com.mentorpulse.mentorshipservice.dto.client.SummarizationResponse;
import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.ResourceNotFoundException;
import com.mentorpulse.mentorshipservice.models.*;
import com.mentorpulse.mentorshipservice.repositories.MentorApplicationRepository;
import com.mentorpulse.mentorshipservice.services.MentorApplicationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.*;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MentorApplicationServiceTest {

    @Mock
    private MentorApplicationRepository repo;
    @Mock
    private SummarizationClient summarizationClient;

    @InjectMocks
    private MentorApplicationService service;

    @Nested
    @DisplayName("createApplication")
    class CreateApplication {
        @Test
        void withoutMessage_succeedsWithoutSummarization() {
            var req = new CreateApplicationRequest(UUID.randomUUID(), UUID.randomUUID(), null);
            when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

            var resp = service.createApplication(req);
            assertThat(resp.application().getApplicationMessage()).isNull();
            assertThat(resp.application().getSummarizedApplicationMessage()).isNull();
            verify(summarizationClient, never()).summarize(anyString());
        }

        @Test
        void withMessage_invokesSummarization() {
            String msg = "Please mentor me";
            var req = new CreateApplicationRequest(UUID.randomUUID(), UUID.randomUUID(), msg);
            when(summarizationClient.summarize(msg)).thenReturn(
                    new SummarizationResponse(1L, msg, "summary", LocalDateTime.now())
            );
            when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

            var resp = service.createApplication(req);
            assertThat(resp.application().getApplicationMessage()).isEqualTo(msg);
            assertThat(resp.application().getSummarizedApplicationMessage()).isEqualTo("summary");
            verify(summarizationClient).summarize(msg);
        }
    }

    @Nested
    @DisplayName("listApplications")
    class ListApplications {
        @Test
        void returnsFilteredList() {
            var list = List.of(new MentorApplication());
            when(repo.findAll(any())).thenReturn(list);

            var resp = service.listApplications(UUID.randomUUID(), UUID.randomUUID());
            assertThat(resp.applications()).hasSize(1);
        }
    }

    @Nested
    @DisplayName("getApplication")
    class GetApplication {
        @Test
        void existing_returnsOptional() {
            var app = new MentorApplication();
            UUID id = UUID.randomUUID();
            app.setId(id);
            when(repo.findById(id)).thenReturn(Optional.of(app));

            var opt = service.getApplication(id);
            assertThat(opt).isPresent().contains(app);
        }

        @Test
        void missing_returnsEmpty() {
            when(repo.findById(any())).thenReturn(Optional.empty());
            assertThat(service.getApplication(UUID.randomUUID())).isEmpty();
        }
    }

    @Nested
    @DisplayName("acceptApplication")
    class AcceptApplication {
        @Test
        void pending_succeedsAndCreatesSession() throws Exception {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.PENDING);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));
            when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = service.acceptApplication(app.getId());
            assertThat(result.getStatus()).isEqualTo(ApplicationStatus.ACCEPTED);
            assertThat(result.getSession()).isNotNull()
                    .extracting(MentorSession::getStatus)
                    .isEqualTo(SessionStatus.ACTIVE);
        }

        @Test
        void nonPending_throwsIllegalState() {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.ACCEPTED);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));

            assertThatThrownBy(() -> service.acceptApplication(app.getId()))
                    .isInstanceOf(IllegalStateException.class);
        }

        @Test
        void missing_throwsNotFound() {
            UUID id = UUID.randomUUID();
            when(repo.findById(id)).thenReturn(Optional.empty());
            assertThatThrownBy(() -> service.acceptApplication(id))
                    .isInstanceOf(ResourceNotFoundException.class);
        }
    }

    @Nested
    @DisplayName("rejectApplication")
    class RejectApplication {
        @Test
        void pending_succeeds() throws Exception {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.PENDING);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));
            when(repo.save(any())).thenAnswer(i -> i.getArgument(0));

            var result = service.rejectApplication(app.getId());
            assertThat(result.getStatus()).isEqualTo(ApplicationStatus.REJECTED);
            assertThat(result.getSession()).isNull();
        }

        @Test
        void nonPending_throwsIllegalState() {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.REJECTED);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));

            assertThatThrownBy(() -> service.rejectApplication(app.getId()))
                    .isInstanceOf(IllegalStateException.class);
        }

        @Test
        void missing_throwsNotFound() {
            when(repo.findById(any())).thenReturn(Optional.empty());
            assertThatThrownBy(() -> service.rejectApplication(UUID.randomUUID()))
                    .isInstanceOf(ResourceNotFoundException.class);
        }
    }

    @Nested
    @DisplayName("scheduleSession")
    class ScheduleSession {
        @Test
        void accepted_succeedsAndSchedules() throws Exception {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.ACCEPTED);
            MentorSession session = new MentorSession();
            session.setStatus(SessionStatus.ACTIVE);
            app.setSession(session);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));
            when(repo.save(any())).thenAnswer(i -> i.getArgument(0));
            Instant start = Instant.now(); Instant end = start.plusSeconds(3600);

            var result = service.scheduleSession(app.getId(), start, end);
            assertThat(result.getSession()).extracting(
                            MentorSession::getStatus,
                            MentorSession::getStartOn,
                            MentorSession::getEndOn)
                    .containsExactly(SessionStatus.SCHEDULED, start, end);
        }

        @Test
        void notAccepted_throwsIllegalState() {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            app.setStatus(ApplicationStatus.PENDING);
            when(repo.findById(app.getId())).thenReturn(Optional.of(app));

            assertThatThrownBy(() -> service.scheduleSession(
                    app.getId(), Instant.now(), Instant.now()))
                    .isInstanceOf(IllegalStateException.class);
        }

        @Test
        void missing_throwsNotFound() {
            when(repo.findById(any())).thenReturn(Optional.empty());
            assertThatThrownBy(() -> service.scheduleSession(
                    UUID.randomUUID(), Instant.now(), Instant.now()))
                    .isInstanceOf(ResourceNotFoundException.class);
        }
    }
}
