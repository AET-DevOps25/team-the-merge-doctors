package com.mentorpulse.userservice.models;


import com.mentorpulse.userservice.dto.UserDto;
import com.mentorpulse.userservice.exceptions.PermissionDeniedException;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.Instant;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Table(name = "user_table")
public class User implements UserDetails {

//    @GeneratedValue
    @Id
    private UUID id;

    @Column(unique = true)
    private String userName;

    @Column(columnDefinition = "text")
    private String passwordHash;

    @Embedded
    private Name name;

    @Embedded
    private Address address;

    @Embedded
    private Contact contact;

    private RoleType roleType;

    private Instant createdAt;

    private Instant lastLoginAt;

    @SneakyThrows
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        if (roleType == null || roleType == RoleType.NONE) {
            throw new PermissionDeniedException("There is no role for user: " + (userName == null ? "" : userName));
        }
        return List.of(new SimpleGrantedAuthority(roleType.name()));
    }

    @Override
    public String getPassword() {
        return passwordHash;
    }

    @Override
    public String getUsername() {
        return userName;
    }

    public UserDto toUserDto() {
        return new UserDto(id, userName, address, roleType, createdAt, lastLoginAt);
    }

    public void updateLastLogin() {
        lastLoginAt = Instant.now();
    }
}
