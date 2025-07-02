package com.mentorpulse.userservice.controllers;

import com.mentorpulse.userservice.dto.*;
import com.mentorpulse.userservice.models.RoleType;
import com.mentorpulse.userservice.services.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.management.InvalidAttributeValueException;
import java.util.UUID;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired private UserService userService;

    @PostMapping("/createUser")
    public ResponseEntity<CreateUserResponse> createUser(
            @RequestBody @Valid CreateUserRequest request) {
        try {
            CreateUserResponse created = userService.createUser(request);
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
