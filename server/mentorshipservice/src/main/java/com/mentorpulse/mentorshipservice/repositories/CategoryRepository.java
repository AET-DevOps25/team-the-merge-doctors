package com.mentorpulse.mentorshipservice.repositories;

import com.mentorpulse.mentorshipservice.models.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID> {

    Boolean existsCategoryByName(String name);
}
