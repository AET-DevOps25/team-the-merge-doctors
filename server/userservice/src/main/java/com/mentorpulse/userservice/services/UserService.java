package com.mentorpulse.userservice.services;

import com.mentorpulse.userservice.dto.*;
import com.mentorpulse.userservice.models.Role;
import com.mentorpulse.userservice.models.User;
import com.mentorpulse.userservice.repositories.RoleRepository;
import com.mentorpulse.userservice.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.argon2.Argon2PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.InvalidAttributeValueException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final Argon2PasswordEncoder passwordEncoder = Argon2PasswordEncoder.defaultsForSpringSecurity_v5_8();

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    @Transactional
    public User createUser(CreateUserRequest request) throws InvalidAttributeValueException {
        Optional<User> existingUser = userRepository.findByUserName(request.userName());
        if (existingUser.isPresent()) {
            throw new InvalidAttributeValueException("Username: " + request.userName() +" is exist in our system.");
        }
        Role role = roleRepository.findByRoleType(request.roleType())
                .orElseThrow(() -> new InvalidAttributeValueException("Role Type `" + request.roleType().name()+ "` doesn't exist"));
        User newUser = User.builder()
                .name(request.name())
                .userName(request.userName())
                .address(request.address())
                .contact(request.contact())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(role)
                .createdAt(Instant.now())
                .lastLoginAt(Instant.now())
                .build();
        newUser = userRepository.save(newUser);
        return newUser;
    }

    @Transactional(readOnly = true)
    public LoginUserResponse loginUser(LoginUserRequest request) throws InvalidAttributeValueException {
        User existingUser = userRepository.findByUserName(request.userName())
                .orElseThrow(() -> new InvalidAttributeValueException("Username: " + request.userName() +" doesn't exist in our system."));
        boolean authenticated = passwordEncoder.encode(request.password()).equals(existingUser.getPasswordHash());
        return new LoginUserResponse(authenticated);
    }

    @Transactional
    public DeleteUserResponse deleteUser(DeleteUserRequest request) throws InvalidAttributeValueException {
        User existingUser = userRepository.findById(request.userId())
                .orElseThrow(() -> new InvalidAttributeValueException("User ID: " + request.userId() +" doesn't exist in our system."));
        userRepository.delete(existingUser);
        return new DeleteUserResponse(existingUser);
    }

    // TODO updateUser

    @Transactional(readOnly = true)
    public GetUserResponse getUser(GetUserRequest request) throws InvalidAttributeValueException {
        User existingUser = userRepository.findById(request.userId())
                .orElseThrow(() -> new InvalidAttributeValueException("User ID: " + request.userId() +" doesn't exist in our system."));
        return new GetUserResponse(existingUser);
    }

    @Transactional(readOnly = true)
    public ListUsersResponse listUsers(ListUsersRequest request) {
        Specification<User> userSpecification = UserRepository.createUserSpecification(request);
        List<User> users = userRepository.findAll(userSpecification);
        return new ListUsersResponse(users);
    }
}
