package com.mentorpulse.mentorshipservice.repositories;

import com.mentorpulse.mentorshipservice.models.Skill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface SkillRepository extends JpaRepository<Skill, UUID> {

    Boolean existsSkillByName(String name);
}
