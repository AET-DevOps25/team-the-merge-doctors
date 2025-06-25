package com.mentorpulse.userservice.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.management.InvalidAttributeValueException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.mentorpulse.userservice.dto.CreateUserRequest;
import com.mentorpulse.userservice.dto.CreateUserResponse;
import com.mentorpulse.userservice.dto.DeleteUserRequest;
import com.mentorpulse.userservice.dto.DeleteUserResponse;
import com.mentorpulse.userservice.dto.GetUserRequest;
import com.mentorpulse.userservice.dto.GetUserResponse;
import com.mentorpulse.userservice.dto.ListUsersRequest;
import com.mentorpulse.userservice.dto.ListUsersResponse;
import com.mentorpulse.userservice.dto.LoginUserRequest;
import com.mentorpulse.userservice.dto.LoginUserResponse;
import com.mentorpulse.userservice.dto.UpdateUserRequest;
import com.mentorpulse.userservice.dto.UpdateUserResponse;
import com.mentorpulse.userservice.services.AuthenticationService;
import com.mentorpulse.userservice.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

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

    @PostMapping("/createUser")
    public ResponseEntity<CreateUserResponse> createUser(@RequestBody @Valid CreateUserRequest request) {
        try {
            CreateUserResponse created = userService.createUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<LoginUserResponse> loginUser(@RequestBody @Valid LoginUserRequest request) {
        try {
            LoginUserResponse rsp = userService.loginUser(request);
            return ResponseEntity.ok(rsp);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @DeleteMapping("/deleteUser")
    public ResponseEntity<DeleteUserResponse> deleteUser(@RequestBody @Valid DeleteUserRequest request) {
        try {
            DeleteUserResponse response = userService.deleteUser(request);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @PatchMapping("/updateUser")
    public ResponseEntity<UpdateUserResponse> updateUser(@RequestBody @Valid UpdateUserRequest request) {
        try {
            UpdateUserResponse response = userService.updateUser(request);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/getUser")
    public ResponseEntity<GetUserResponse> getUser(@RequestBody @Valid GetUserRequest req) {
        try {
            GetUserResponse response = userService.getUser(req);
            return ResponseEntity.ok(response);
        } catch (InvalidAttributeValueException ex) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, ex.getMessage(), ex);
        }
    }

    @GetMapping("/listUsers")
    public ResponseEntity<ListUsersResponse> listUsers(@RequestBody @Valid ListUsersRequest request) {
        ListUsersResponse rsp = userService.listUsers(request);
        return ResponseEntity.ok(rsp);
    }

}