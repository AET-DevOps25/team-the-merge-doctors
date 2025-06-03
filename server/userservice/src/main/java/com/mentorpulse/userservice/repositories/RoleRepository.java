package com.mentorpulse.userservice.repositories;

import com.mentorpulse.userservice.models.Role;
import com.mentorpulse.userservice.models.RoleType;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface RoleRepository extends CrudRepository<Role, UUID> {
    Optional<Role> findByRoleType(RoleType roleType);
}
