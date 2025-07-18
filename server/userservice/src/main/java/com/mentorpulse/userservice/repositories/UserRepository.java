package com.mentorpulse.userservice.repositories;

import com.mentorpulse.userservice.models.*;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends JpaRepository<User, UUID>, JpaSpecificationExecutor<User> {
    Optional<User> findByUserName(String userName);

    static Specification<User> createUserSpecification(RoleType roleType) {
        Specification<User> specification = Specification.allOf();
        if (roleType != RoleType.NONE) {
            specification = specification.and(roleTypeEquals(roleType));
        }
        return specification;
    }

    static Specification<User> roleTypeEquals(RoleType roleType) {
        return (root, query, cb) -> cb.equal(root.get(User_.roleType), roleType);
    }
}
