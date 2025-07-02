package com.mentorpulse.userservice.services;

import com.mentorpulse.userservice.dto.*;
import com.mentorpulse.userservice.models.RoleType;
import com.mentorpulse.userservice.models.User;
import com.mentorpulse.userservice.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.management.InvalidAttributeValueException;
import java.time.Instant;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static com.mentorpulse.userservice.utils.PatchUpdater.patchUpdate;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationService authenticationService;

    @Transactional
    public CreateUserResponse createUser(CreateUserRequest request)
            throws InvalidAttributeValueException {
        Optional<User> existingUser = userRepository.findByUserName(request.userName());
        if (existingUser.isPresent()) {
            throw new InvalidAttributeValueException(
                    "Username: " + request.userName() + " is exist in our system.");
        }

        User newUser =
                User.builder()
                        .id(
                                ObjectUtils.isEmpty(request.id())
                                        ? UUID.randomUUID()
                                        : UUID.fromString(request.id()))
                        .name(request.name())
                        .userName(request.userName())
                        .address(request.address())
                        .contact(request.contact())
                        .passwordHash(passwordEncoder.encode(request.password()))
                        .roleType(request.roleType())
                        .createdAt(Instant.now())
                        .lastLoginAt(Instant.now())
                        .build();
        newUser = userRepository.save(newUser);
        String token =
                authenticationService.generateToken(
                        newUser.getUsername(), newUser.getId(), newUser.getRoleType());
        return new CreateUserResponse(newUser.getId(), token);
    }

    @Transactional
    public LoginUserResponse loginUser(LoginUserRequest request)
            throws InvalidAttributeValueException {
        User existingUser =
                userRepository
                        .findByUserName(request.userName())
                        .orElseThrow(
                                () ->
                                        new InvalidAttributeValueException(
                                                "Username: "
                                                        + request.userName()
                                                        + " doesn't exist in our system."));
        existingUser.updateLastLogin();

        boolean authenticated =
                passwordEncoder.matches(request.password(), existingUser.getPasswordHash());
        String token =
                authenticated
                        ? authenticationService.generateToken(
                                existingUser.getUsername(),
                                existingUser.getId(),
                                existingUser.getRoleType())
                        : "";
        return new LoginUserResponse(authenticated, token);
    }

    @Transactional
    public DeleteUserResponse deleteUser(DeleteUserRequest request)
            throws InvalidAttributeValueException {
        User existingUser =
                userRepository
                        .findById(request.userId())
                        .orElseThrow(
                                () ->
                                        new InvalidAttributeValueException(
                                                "User ID: "
                                                        + request.userId()
                                                        + " doesn't exist in our system."));
        userRepository.delete(existingUser);
        return new DeleteUserResponse(existingUser.toUserDto());
    }

    @Transactional
    public UpdateUserResponse updateUser(UpdateUserRequest request)
            throws InvalidAttributeValueException {
        User existingUser =
                userRepository
                        .findById(request.user().getId())
                        .orElseThrow(
                                () ->
                                        new InvalidAttributeValueException(
                                                "User ID: "
                                                        + request.user().getId()
                                                        + " doesn't exist in our system."));
        patchUpdate(existingUser, request.user());
        userRepository.save(existingUser);
        return new UpdateUserResponse(existingUser.toUserDto());
    }

    @Transactional(readOnly = true)
    public GetUserResponse getUser(UUID userId) throws InvalidAttributeValueException {
        User existingUser =
                userRepository
                        .findById(userId)
                        .orElseThrow(
                                () ->
                                        new InvalidAttributeValueException(
                                                "User ID: "
                                                        + userId
                                                        + " doesn't exist in our system."));
        return new GetUserResponse(existingUser.toUserDto());
    }

    @Transactional(readOnly = true)
    public ListUsersResponse listUsers(RoleType roleType) {
        Specification<User> userSpecification = UserRepository.createUserSpecification(roleType);
        List<User> users = userRepository.findAll(userSpecification);
        return new ListUsersResponse(users.stream().map(User::toUserDto).toList());
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> existingUser = userRepository.findByUserName(username);
        if (existingUser.isEmpty()) {
            throw new UsernameNotFoundException(
                    "Username: " + username + " does not exist in our system.");
        }
        return existingUser.get();
    }
}
