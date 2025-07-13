package com.mentorpulse.mentorshipservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentorpulse.mentorshipservice.controller.MentorApplicationController;
import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.ResourceNotFoundException;
import com.mentorpulse.mentorshipservice.models.MentorApplication;
import com.mentorpulse.mentorshipservice.models.ApplicationStatus;
import com.mentorpulse.mentorshipservice.models.MentorSession;
import com.mentorpulse.mentorshipservice.models.SessionStatus;
import com.mentorpulse.mentorshipservice.services.MentorApplicationService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MentorApplicationController.class)
@AutoConfigureMockMvc(addFilters = false)
class MentorApplicationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private MentorApplicationService service;

    @Nested
    @DisplayName("POST /createApplication")
    class CreateApplicationTests {
        @Test
        void returns201AndBody() throws Exception {
            UUID mid = UUID.randomUUID();
            UUID meid = UUID.randomUUID();
            String msg = "Hello";
            CreateApplicationRequest req = new CreateApplicationRequest(mid, meid, msg);
            MentorApplication app = MentorApplication.builder()
                    .id(UUID.randomUUID())
                    .mentorId(mid)
                    .menteeId(meid)
                    .status(ApplicationStatus.PENDING)
                    .applicationMessage(msg)
                    .summarizedApplicationMessage("sum")
                    .build();
            Mockito.when(service.createApplication(any())).thenReturn(new CreateApplicationResponse(app));

            mockMvc.perform(post("/api/mentorship/createApplication")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.application.mentorId").value(mid.toString()));
        }
    }

    @Nested
    @DisplayName("GET /listApplications")
    class ListApplicationsTests {
        @Test
        void returns200WithList() throws Exception {
            MentorApplication app = new MentorApplication();
            app.setId(UUID.randomUUID());
            ListApplicationResponse resp = new ListApplicationResponse(List.of(app));
            Mockito.when(service.listApplications(eq(null), eq(null))).thenReturn(resp);

            mockMvc.perform(get("/api/mentorship/listApplications"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.applications").isArray());
        }
    }

    @Nested
    @DisplayName("GET /application/{id}")
    class GetApplicationTests {
        @Test
        void existing_returns200() throws Exception {
            UUID id = UUID.randomUUID();
            MentorApplication app = new MentorApplication(); app.setId(id);
            Mockito.when(service.getApplication(id)).thenReturn(Optional.of(app));

            mockMvc.perform(get("/api/mentorship/application/{id}", id))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.application.id").value(id.toString()));
        }

        @Test
        void missing_returns404() throws Exception {
            UUID id = UUID.randomUUID();
            Mockito.when(service.getApplication(id)).thenReturn(Optional.empty());

            mockMvc.perform(get("/api/mentorship/application/{id}", id))
                    .andExpect(status().isNotFound());
        }
    }

    @Nested
    @DisplayName("PUT /acceptApplication/{id}")
    class AcceptApplicationTests {
        @Test
        void pending_returns200() throws Exception {
            UUID id = UUID.randomUUID();
            MentorApplication app = new MentorApplication();
            app.setId(id);
            app.setStatus(ApplicationStatus.ACCEPTED);
            MentorSession sess = new MentorSession(); sess.setStatus(SessionStatus.ACTIVE);
            app.setSession(sess);
            Mockito.when(service.acceptApplication(id)).thenReturn(app);

            mockMvc.perform(put("/api/mentorship/acceptApplication/{id}", id))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.application.status").value("ACCEPTED"));
        }

        @Test
        void notFound_returns404() throws Exception {
            UUID id = UUID.randomUUID();
            Mockito.doThrow(new ResourceNotFoundException("not found")).when(service).acceptApplication(id);

            mockMvc.perform(put("/api/mentorship/acceptApplication/{id}", id))
                    .andExpect(status().isNotFound());
        }

        @Test
        void wrongState_returns409() throws Exception {
            UUID id = UUID.randomUUID();
            Mockito.doThrow(new IllegalStateException()).when(service).acceptApplication(id);

            mockMvc.perform(put("/api/mentorship/acceptApplication/{id}", id))
                    .andExpect(status().isConflict());
        }
    }

    @Nested
    @DisplayName("PUT /rejectApplication/{id}")
    class RejectApplicationTests {
        @Test
        void pending_returns200() throws Exception {
            UUID id = UUID.randomUUID();
            MentorApplication app = new MentorApplication();
            app.setId(id);
            app.setStatus(ApplicationStatus.REJECTED);
            Mockito.when(service.rejectApplication(id)).thenReturn(app);

            mockMvc.perform(put("/api/mentorship/rejectApplication/{id}", id))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.application.status").value("REJECTED"));
        }

        @Test
        void notFound_returns404() throws Exception {
            UUID id = UUID.randomUUID();
            Mockito.doThrow(new ResourceNotFoundException("not found")).when(service).rejectApplication(id);

            mockMvc.perform(put("/api/mentorship/rejectApplication/{id}", id))
                    .andExpect(status().isNotFound());
        }

        @Test
        void wrongState_returns409() throws Exception {
            UUID id = UUID.randomUUID();
            Mockito.doThrow(new IllegalStateException()).when(service).rejectApplication(id);

            mockMvc.perform(put("/api/mentorship/rejectApplication/{id}", id))
                    .andExpect(status().isConflict());
        }
    }

    @Nested
    @DisplayName("PUT /scheduleSession")
    class ScheduleSessionTests {
        @Test
        void accepted_returns200() throws Exception {
            UUID id = UUID.randomUUID();
            Instant start = Instant.now(); Instant end = start.plusSeconds(1800);
            MentorApplication app = new MentorApplication();
            MentorSession session = new MentorSession();
            session.setStatus(SessionStatus.SCHEDULED);
            session.setStartOn(start);
            session.setEndOn(end);
            app.setId(id); app.setSession(session);
            ScheduleSessionRequest req = new ScheduleSessionRequest(id, start, end);
            Mockito.when(service.scheduleSession(id, start, end)).thenReturn(app);

            mockMvc.perform(put("/api/mentorship/scheduleSession")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.application.session.status").value("SCHEDULED"));
        }

        @Test
        void notFound_returns404() throws Exception {
            UUID id = UUID.randomUUID();
            ScheduleSessionRequest req = new ScheduleSessionRequest(id, Instant.now(), Instant.now());
            Mockito.doThrow(new ResourceNotFoundException("not found")).when(service).scheduleSession(eq(id), any(), any());

            mockMvc.perform(put("/api/mentorship/scheduleSession")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isNotFound());
        }

        @Test
        void wrongState_returns409() throws Exception {
            UUID id = UUID.randomUUID();
            ScheduleSessionRequest req = new ScheduleSessionRequest(id, Instant.now(), Instant.now());
            Mockito.doThrow(new IllegalStateException()).when(service).scheduleSession(eq(id), any(), any());

            mockMvc.perform(put("/api/mentorship/scheduleSession")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isConflict());
        }
    }
}
