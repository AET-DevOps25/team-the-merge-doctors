package com.mentorpulse.userservice;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mentorpulse.userservice.dto.*;
import com.mentorpulse.userservice.models.*;
import com.mentorpulse.userservice.repositories.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;


import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest(
        properties = "spring.main.allow-bean-definition-overriding=true"

)
@AutoConfigureMockMvc
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.ANY)
@Import(JwtTestConfig.class)
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private UserRepository userRepository;

    @BeforeEach
    void cleanup() {
        userRepository.deleteAll();
    }

    @Nested
    @DisplayName("createUser endpoint")
    class CreateUserTests {
        @Test
        @DisplayName("creates a user successfully and returns 201")
        void createUserSuccess() throws Exception {
            CreateUserRequest req = new CreateUserRequest(
                    null,
                    "alice",
                    "password",
                    new Name("", "Alice", "", "Wonder"),
                    Contact.builder().email("a@a.com").phoneNumber("123").mobileNumber("456").build(),
                    Address.builder().city("City").country("Country").build(),
                    RoleType.MENTEE
            );

            mockMvc.perform(post("/api/user/createUser")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(req)))
                    .andExpect(status().isCreated())
                    .andExpect(jsonPath("$.userId").exists())
                    .andExpect(jsonPath("$.token").isNotEmpty());

            assertThat(userRepository.findByUserName("alice")).isPresent();
        }
    }

    @Nested
    @DisplayName("loginUser endpoint")
    class LoginUserTests {
        @Test
        @DisplayName("authenticates valid user and returns token")
        void loginSuccess() throws Exception {
            CreateUserRequest createReq = new CreateUserRequest(
                    null, "charlie", "secret",
                    new Name("", "C", "", "H"),
                    Contact.builder().email("c@c.com").phoneNumber("").mobileNumber("").build(),
                    Address.builder().city("").country("").build(),
                    RoleType.MENTOR
            );
            mockMvc.perform(post("/api/user/createUser")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createReq)))
                    .andReturn().getResponse().getContentAsString();

            LoginUserRequest loginReq = new LoginUserRequest("charlie", "secret");
            mockMvc.perform(post("/api/user/login")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(loginReq)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.authenticated").value(true))
                    .andExpect(jsonPath("$.token").isNotEmpty())
                    .andExpect(jsonPath("$.user.userName").value("charlie"));
        }
    }

    @Nested
    @DisplayName("updateUser endpoint")
    class UpdateUserTests {
        @Test
        @DisplayName("updates existing user's name successfully")
        void updateUserSuccess() throws Exception {
            CreateUserRequest createReq = new CreateUserRequest(
                    null, "dan", "pwd",
                    new Name("", "Dan", "", "One"),
                    Contact.builder().email("d@d.com").phoneNumber("").mobileNumber("").build(),
                    Address.builder().city("").country("").build(),
                    RoleType.MENTOR
            );
            var createJson = mockMvc.perform(post("/api/user/createUser")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createReq)))
                    .andReturn().getResponse().getContentAsString();
            CreateUserResponse createResp = objectMapper.readValue(createJson, CreateUserResponse.class);

            User existing = userRepository.findById(createResp.userId()).orElseThrow();
            existing.setName(new Name("", "Daniel", "", "One"));
            UpdateUserRequest updateReq = new UpdateUserRequest(existing);
            String token = createResp.token();

            mockMvc.perform(patch("/api/user/updateUser")
                            .header("Authorization", "Bearer " + token)
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(updateReq)))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.updatedUser.name.firstName").value("Daniel"));

            User updated = userRepository.findById(existing.getId()).orElseThrow();
            assertThat(updated.getName().getFirstName()).isEqualTo("Daniel");
        }
    }

    @Nested
    @DisplayName("getUser endpoint")
    class GetUserTests {
        @Test
        @DisplayName("retrieves user by ID")
        void getUserSuccess() throws Exception {
            CreateUserRequest createReq = new CreateUserRequest(
                    null, "eve", "pw",
                    new Name("", "E", "", "V"),
                    Contact.builder().email("e@e.com").phoneNumber("").mobileNumber("").build(),
                    Address.builder().city("").country("").build(),
                    RoleType.MENTEE
            );
            var createJson = mockMvc.perform(post("/api/user/createUser")
                            .contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(createReq)))
                    .andReturn().getResponse().getContentAsString();
            CreateUserResponse createResp = objectMapper.readValue(createJson, CreateUserResponse.class);
            String token = createResp.token();

            mockMvc.perform(get("/api/user/getUser")
                            .param("userId", String.valueOf(createResp.userId()))
                            .header("Authorization", "Bearer " + token))
                    .andExpect(status().isOk())
                    .andExpect(jsonPath("$.user.userName").value("eve"));
        }
    }

    @Nested
    @DisplayName("listUsers endpoint")
    class ListUsersTests {
        @Test
        @DisplayName("lists users filtered by role")
        void listUsersByRole() throws Exception {
            CreateUserRequest mentorReq = new CreateUserRequest(
                    null, "bob", "pass",
                    new Name("", "Bob", "", "Builder"),
                    Contact.builder().email("b@b.com").phoneNumber("").mobileNumber("").build(),
                    Address.builder().city("").country("").build(),
                    RoleType.MENTOR
            );
            String mJson = mockMvc.perform(post("/api/user/createUser").contentType(MediaType.APPLICATION_JSON)
                            .content(objectMapper.writeValueAsString(mentorReq)))
                    .andReturn().getResponse().getContentAsString();
            CreateUserResponse mResp = objectMapper.readValue(mJson, CreateUserResponse.class);
            String token = mResp.token();

            CreateUserRequest menteeReq = new CreateUserRequest(
                    null, "carol", "pass",
                    new Name("", "C", "", "L"),
                    Contact.builder().email("c@c.com").phoneNumber("").mobileNumber("").build(),
                    Address.builder().city("").country("").build(),
                    RoleType.MENTEE
            );
            mockMvc.perform(post("/api/user/createUser").contentType(MediaType.APPLICATION_JSON)
                    .content(objectMapper.writeValueAsString(menteeReq)));

            String listJson = mockMvc.perform(get("/api/user/listUsers")
                            .param("roleType", "MENTOR")
                            .header("Authorization", "Bearer " + token))
                    .andExpect(status().isOk())
                    .andReturn().getResponse().getContentAsString();
            ListUsersResponse listResp = objectMapper.readValue(listJson, ListUsersResponse.class);
            assertThat(listResp.users()).allMatch(u -> u.role().equals(RoleType.MENTOR));
        }
    }
}
