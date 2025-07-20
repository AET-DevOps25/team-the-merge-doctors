package com.mentorpulse.userservice.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.management.InvalidAttributeValueException;
import com.mentorpulse.userservice.models.RoleType;
import com.mentorpulse.userservice.services.UserService;
import io.micrometer.core.instrument.Counter;
import io.micrometer.core.instrument.MeterRegistry;
import jakarta.annotation.PostConstruct;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import com.mentorpulse.userservice.dto.CreateUserRequest;
import com.mentorpulse.userservice.dto.CreateUserResponse;
import com.mentorpulse.userservice.dto.DeleteUserRequest;
import com.mentorpulse.userservice.dto.DeleteUserResponse;
import com.mentorpulse.userservice.dto.GetUserResponse;
import com.mentorpulse.userservice.dto.ListUsersResponse;
import com.mentorpulse.userservice.dto.LoginUserRequest;
import com.mentorpulse.userservice.dto.LoginUserResponse;
import com.mentorpulse.userservice.dto.UpdateUserRequest;
import com.mentorpulse.userservice.dto.UpdateUserResponse;
import com.mentorpulse.userservice.services.AuthenticationService;

import jakarta.servlet.http.HttpServletRequest;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    @Autowired private UserService userService;

    @Autowired
    private AuthenticationService authenticationService;


    @GetMapping("/auth/status")
    public ResponseEntity<Map<String, Object>> getAuthStatus(Authentication authentication, HttpServletRequest request) {
        // The JwtAuthenticationFilter already validated the token and set the Authentication
        if (authentication != null && authentication.isAuthenticated()) {
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();

            Map<String, Object> response = new HashMap<>();
            response.put("valid", true);
            response.put("username", userDetails.getUsername());

            // Extract role and userId from the JWT token (already validated by filter)
            String authHeader = request.getHeader("Authorization");
            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String token = authHeader.substring(7);
                // Reuse existing AuthenticationService methods
                String userId = authenticationService.extractClaim(token, claims -> claims.get("userId", String.class));
                String role = authenticationService.extractClaim(token, claims -> claims.get("role", String.class));
                response.put("userId", userId);
                response.put("role", role);
            }

            return ResponseEntity.ok(response);
        }

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("valid", false));
    }
    @Autowired private MeterRegistry meterRegistry;

    private Counter userCreationCounter;

    // Initialize the counter in a @PostConstruct method
    @PostConstruct
    public void init() {
        this.userCreationCounter = Counter.builder("custom_user_registrations_total")
                .description("Custom counter for user registrations total number")
                .register(meterRegistry);
    }

    @PostMapping("/createUser")
    public ResponseEntity<CreateUserResponse> createUser(
            @RequestBody @Valid CreateUserRequest request) {
        try {
            CreateUserResponse created = userService.createUser(request);
            
            // Increment the counter after successful user creation
            userCreationCounter.increment();
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponse> loginUser(
            @RequestBody @Valid LoginUserRequest request) {
        try {
            LoginUserResponse rsp = userService.loginUser(request);
            return ResponseEntity.ok(rsp);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<DeleteUserResponse> deleteUser(
            @RequestBody @Valid DeleteUserRequest request) {
        try {
            DeleteUserResponse response = userService.deleteUser(request);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PatchMapping("/updateUser")
    public ResponseEntity<UpdateUserResponse> updateUser(
            @RequestBody @Valid UpdateUserRequest request) {
        try {
            UpdateUserResponse response = userService.updateUser(request);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<GetUserResponse> getUser(@RequestParam UUID userId) {
        try {
            GetUserResponse response = userService.getUser(userId);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/listUsers")
    public ResponseEntity<ListUsersResponse> listUsers(@RequestParam RoleType roleType) {
        ListUsersResponse rsp = userService.listUsers(roleType);
        return ResponseEntity.ok(rsp);
    }
}
