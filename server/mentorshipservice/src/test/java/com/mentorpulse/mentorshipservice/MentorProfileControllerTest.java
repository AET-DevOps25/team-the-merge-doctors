package com.mentorpulse.mentorshipservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentorpulse.mentorshipservice.controller.MentorProfileController;
import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.AlreadyExistsException;
import com.mentorpulse.mentorshipservice.exceptions.InvalidArgumentsException;
import com.mentorpulse.mentorshipservice.exceptions.NotFoundException;
import com.mentorpulse.mentorshipservice.models.MentorProfile;
import com.mentorpulse.mentorshipservice.services.MentorProfileService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(MentorProfileController.class)
@AutoConfigureMockMvc(addFilters = false)
class MentorProfileControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockitoBean
    private MentorProfileService service;

    @Nested
    @DisplayName("createSkill endpoint")
    class CreateSkillTests {
        @Test
        @DisplayName("returns 201 on valid skill")
        void createSkillSuccess() throws Exception {
            var req = new CreateSkillRequest(null, "Go");
            var skill = new com.mentorpulse.mentorshipservice.models.Skill(UUID.randomUUID(), "Go");
            var resp = new CreateSkillResponse(skill);
            Mockito.when(service.createSkill(any())).thenReturn(resp);

            mockMvc.perform(post("/api/mentorship/createSkill")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.skill.name").value("Go"));
        }

        @Test
        @DisplayName("returns 400 on invalid skill")
        void createSkillInvalid() throws Exception {
            Mockito.when(service.createSkill(any()))
                    .thenThrow(new InvalidArgumentsException("skill"));

            mockMvc.perform(post("/api/mentorship/createSkill")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("listSkills endpoint")
    class ListSkillsTests {
        @Test
        @DisplayName("returns 200 and list of skills")
        void listSkills() throws Exception {
            var skill = new com.mentorpulse.mentorshipservice.models.Skill(UUID.randomUUID(), "Rust");
            var resp = new ListSkillResponse(List.of(skill));
            Mockito.when(service.listSkills()).thenReturn(resp);

            mockMvc.perform(get("/api/mentorship/listSkills"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.skills[0].name").value("Rust"));
        }
    }

    @Nested
    @DisplayName("createCategory endpoint")
    class CreateCategoryTests {
        @Test
        @DisplayName("returns 201 on valid category")
        void createCategorySuccess() throws Exception {
            var req = new CreateCategoryRequest(null, "Cloud");
            var category = new com.mentorpulse.mentorshipservice.models.Category(UUID.randomUUID(), "Cloud");
            var resp = new CreateCategoryResponse(category);
            Mockito.when(service.createCategory(any())).thenReturn(resp);

            mockMvc.perform(post("/api/mentorship/createCategory")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.category.name").value("Cloud"));
        }

        @Test
        @DisplayName("returns 400 on duplicate category")
        void createCategoryDuplicate() throws Exception {
            Mockito.when(service.createCategory(any()))
                    .thenThrow(new AlreadyExistsException("category", "Cloud"));

            mockMvc.perform(post("/api/mentorship/createCategory")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(new CreateCategoryRequest(null, "Cloud"))))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("listCategories endpoint")
    class ListCategoriesTests {
        @Test
        @DisplayName("returns 200 and list of categories")
        void listCategories() throws Exception {
            var cat = new com.mentorpulse.mentorshipservice.models.Category(UUID.randomUUID(), "AI");
            Mockito.when(service.listCategories()).thenReturn(new ListCategoryResponse(List.of(cat)));

            mockMvc.perform(get("/api/mentorship/listCategories"))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.categories[0].name").value("AI"));
        }
    }

    @Nested
    @DisplayName("createMentorProfile endpoint")
    class CreateMentorProfileTests {
        @Test
        @DisplayName("returns 201 on valid profile")
        void createMentorProfileSuccess() throws Exception {
            var profile = new com.mentorpulse.mentorshipservice.models.MentorProfile();
            profile.setMentorId(UUID.randomUUID());
            var req = new CreateMentorProfileRequest(profile);
            var resp = new CreateMentorProfileResponse(profile);
            Mockito.when(service.createMentorProfile(any())).thenReturn(resp);

            mockMvc.perform(post("/api/mentorship/createMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated());
        }

        @Test
        @DisplayName("returns 400 on invalid arguments")
        void createMentorProfileInvalid() throws Exception {
            Mockito.when(service.createMentorProfile(any()))
                    .thenThrow(new InvalidArgumentsException("mentorId"));

            mockMvc.perform(post("/api/mentorship/createMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content("{}"))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("updateMentorProfile endpoint")
    class UpdateMentorProfileTests {
        @Test
        @DisplayName("returns 200 on valid update")
        void updateMentorProfileSuccess() throws Exception {
            var profile = new com.mentorpulse.mentorshipservice.models.MentorProfile();
            profile.setId(UUID.randomUUID());
            var req = new UpdateMentorProfileRequest(profile);
            Mockito.when(service.updateMentorProfile(any())).thenReturn(new UpdateMentorProfileResponse(profile));

            mockMvc.perform(patch("/api/mentorship/updateMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("returns 400 on not found")
        void updateMentorProfileNotFound() throws Exception {
            Mockito.when(service.updateMentorProfile(any()))
                    .thenThrow(new javax.management.InvalidAttributeValueException("not found"));

            mockMvc.perform(patch("/api/mentorship/updateMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(new UpdateMentorProfileRequest(new com.mentorpulse.mentorshipservice.models.MentorProfile()))))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("getMentorProfile endpoint")
    class GetMentorProfileTests {
        @Test
        @DisplayName("returns 200 on valid get")
        void getMentorProfileSuccess() throws Exception {
            UUID mid = UUID.randomUUID();
            var resp = new GetMentorProfileResponse(new com.mentorpulse.mentorshipservice.models.MentorProfile());
            Mockito.when(service.getMentorProfile(eq(mid))).thenReturn(resp);

            mockMvc.perform(get("/api/mentorship/getMentorProfile")
                            .param("mentorId", mid.toString()))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("returns 400 on not found")
        void getMentorProfileNotFound() throws Exception {
            UUID mid = UUID.randomUUID();
            Mockito.when(service.getMentorProfile(eq(mid))).thenThrow(new NotFoundException("mentorProfile"));

            mockMvc.perform(get("/api/mentorship/getMentorProfile")
                            .param("mentorId", mid.toString()))
                    .andExpect(status().isBadRequest());
        }
    }

    @Nested
    @DisplayName("listMentorProfiles endpoint")
    class ListMentorProfilesTests {
        @Test
        @DisplayName("returns 200 and list")
        void listMentorProfiles() throws Exception {
            var req = new ListMentorProfileRequest(null,null,null);
            var list = List.of(new MentorProfile());
            Mockito.when(service.listMentorProfiles(any())).thenReturn(new ListMentorProfileResponse(list));

            mockMvc.perform(post("/api/mentorship/listMentorProfiles")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.mentorProfiles").isArray());
        }
    }

    @Nested
    @DisplayName("deleteMentorProfile endpoint")
    class DeleteMentorProfileTests {
        @Test
        @DisplayName("returns 200 on valid delete")
        void deleteMentorProfileSuccess() throws Exception {
            UUID pid = UUID.randomUUID();
            var resp = new DeleteMentorProfileResponse(new com.mentorpulse.mentorshipservice.models.MentorProfile());
            Mockito.when(service.deleteMentorProfile(any())).thenReturn(resp);

            mockMvc.perform(delete("/api/mentorship/deleteMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(new DeleteMentorProfileRequest(pid))))
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("returns 400 on not found")
        void deleteMentorProfileNotFound() throws Exception {
            Mockito.when(service.deleteMentorProfile(any()))
                    .thenThrow(new javax.management.InvalidAttributeValueException("not found"));

            mockMvc.perform(delete("/api/mentorship/deleteMentorProfile")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(new DeleteMentorProfileRequest(UUID.randomUUID()))))
                    .andExpect(status().isBadRequest());
        }
    }
}

