package com.mentorpulse.mentorshipservice.services;

import com.mentorpulse.mentorshipservice.dto.*;
import com.mentorpulse.mentorshipservice.exceptions.AlreadyExistsException;
import com.mentorpulse.mentorshipservice.exceptions.InvalidArgumentsException;
import com.mentorpulse.mentorshipservice.models.Category;
import com.mentorpulse.mentorshipservice.models.MentorProfile;
import com.mentorpulse.mentorshipservice.models.Skill;
import com.mentorpulse.mentorshipservice.repositories.CategoryRepository;
import com.mentorpulse.mentorshipservice.repositories.MentorProfileRepository;
import com.mentorpulse.mentorshipservice.repositories.SkillRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestBody;

import javax.management.InvalidAttributeValueException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class MentorProfileService {

    private final MentorProfileRepository mentorProfileRepository;
    private final CategoryRepository categoryRepository;
    private final SkillRepository skillRepository;

    @Transactional
    public CreateSkillResponse createSkill(@RequestBody @Valid CreateSkillRequest request) throws InvalidArgumentsException, AlreadyExistsException {
        String skillName = request.skill() == null ? null : request.skill().trim();
        if (skillName == null || skillName.trim().isEmpty()) {
            throw new InvalidArgumentsException("skill");
        }
        if (skillRepository.existsSkillByName(skillName)) {
            throw new AlreadyExistsException("skill", skillName);
        }
        Skill skill = Skill.builder().name(skillName).build();
        skill = skillRepository.save(skill);
        return new CreateSkillResponse(skill);
    }

    @Transactional(readOnly = true)
    public ListSkillResponse listSkills(ListSkillRequest request) {
        List<Skill> skills = skillRepository.findAll();
        return new ListSkillResponse(skills);
    }

    @Transactional
    public CreateCategoryResponse createCategory(CreateCategoryRequest request) throws InvalidArgumentsException, AlreadyExistsException {
        String categoryName = request.category() == null ? null : request.category().trim();
        if (categoryName == null || categoryName.trim().isEmpty()) {
            throw new InvalidArgumentsException("category");
        }
        if (skillRepository.existsSkillByName(categoryName)) {
            throw new AlreadyExistsException("category", categoryName);
        }
        Category category = Category.builder().name(categoryName).build();
        category = categoryRepository.save(category);
        return new CreateCategoryResponse(category);
    }

    @Transactional(readOnly = true)
    public ListCategoryResponse listCategories(ListCategoryRequest request) {
        List<Category> categories = categoryRepository.findAll();
        return new ListCategoryResponse(categories);
    }

    @Transactional
    public CreateMentorProfileResponse createMentorProfile(CreateMentorProfileRequest request) throws AlreadyExistsException, InvalidArgumentsException {
        UUID mentorId = request.mentorProfile().getMentorId();;
        if (mentorId == null) {
            throw new InvalidArgumentsException("mentorId");
        }
        if (mentorProfileRepository.existsMentorProfileByMentorId(mentorId)) {
            throw new AlreadyExistsException("mentorId", mentorId);
        }

        MentorProfile mentorProfile = mentorProfileRepository.save(request.mentorProfile());
        return new CreateMentorProfileResponse(mentorProfile);
    }

    @Transactional
    public UpdateMentorProfileResponse updateMentorProfile(UpdateMentorProfileRequest request) throws InvalidAttributeValueException, InvalidArgumentsException {
        MentorProfile existingProfile = mentorProfileRepository.findById(request.mentorProfile().getId())
                .orElseThrow(() -> new InvalidAttributeValueException("Mentor Profile ID: " + request.mentorProfile().getId() +" doesn't exist in our system."));
        MentorProfile newProfile = request.mentorProfile();
        if (!Objects.equals(newProfile.getMentorId(), existingProfile.getMentorId())) {
            throw new InvalidArgumentsException("mentorId");
        }
        newProfile = mentorProfileRepository.save(newProfile);
        return new UpdateMentorProfileResponse(newProfile);
    }

    @Transactional
    public DeleteMentorProfileResponse deleteMentorProfile(DeleteMentorProfileRequest request) throws InvalidAttributeValueException {
        MentorProfile existingProfile = mentorProfileRepository.findById(request.profileId())
                .orElseThrow(() -> new InvalidAttributeValueException("Mentor Profile ID: " + request.profileId() +" doesn't exist in our system."));
        mentorProfileRepository.delete(existingProfile);
        return new DeleteMentorProfileResponse(existingProfile);
    }
    @Transactional(readOnly = true)
    public ListMentorProfileResponse listMentorProfiles(ListMentorProfileRequest request) {
        Specification<MentorProfile> mentorProfileSpecification = MentorProfileRepository.createMentorProfileSpecification(request);
        List<MentorProfile> mentorProfiles = mentorProfileRepository.findAll(mentorProfileSpecification);
        return new ListMentorProfileResponse(mentorProfiles);
    }
}
