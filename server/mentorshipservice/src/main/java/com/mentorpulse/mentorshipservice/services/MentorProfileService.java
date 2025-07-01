package com.mentorpulse.mentorshipservice.services;

import com.mentorpulse.mentorshipservice.dto.*;
import com.mentorpulse.mentorshipservice.exceptions.AlreadyExistsException;
import com.mentorpulse.mentorshipservice.exceptions.InvalidArgumentsException;
import com.mentorpulse.mentorshipservice.exceptions.NotFoundException;
import com.mentorpulse.mentorshipservice.models.Category;
import com.mentorpulse.mentorshipservice.models.MentorProfile;
import com.mentorpulse.mentorshipservice.models.Skill;
import com.mentorpulse.mentorshipservice.repositories.CategoryRepository;
import com.mentorpulse.mentorshipservice.repositories.MentorProfileRepository;
import com.mentorpulse.mentorshipservice.repositories.SkillRepository;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public CreateSkillResponse createSkill(CreateSkillRequest request) throws InvalidArgumentsException, AlreadyExistsException {
        String skillName = request.skill() == null ? null : request.skill().trim();
        if (skillName == null || skillName.trim().isEmpty()) {
            throw new InvalidArgumentsException("skill");
        }
        if (skillRepository.existsSkillByName(skillName)) {
            throw new AlreadyExistsException("skill", skillName);
        }
        Skill skill = Skill.builder()
                .id(ObjectUtils.isEmpty(request.id()) ? UUID.randomUUID() : UUID.fromString(request.id()))
                .name(skillName)
                .build();
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
        Category category = Category.builder()
                .id(ObjectUtils.isEmpty(request.id()) ? UUID.randomUUID() : UUID.fromString(request.id()))
                .name(categoryName)
                .build();
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
        MentorProfile mentorProfile = request.mentorProfile();
        if (ObjectUtils.isEmpty(mentorProfile.getId())) {
            mentorProfile.setId(UUID.randomUUID());
        }
        mentorProfile = mentorProfileRepository.save(mentorProfile);
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
    public GetMentorProfileResponse getMentorProfile(GetMentorProfileRequest request) throws InvalidArgumentsException, NotFoundException {
        UUID mentorId = request.mentorId();
        if (mentorId == null) {
            throw new InvalidArgumentsException("mentorId");
        }
        MentorProfile mentorProfile = mentorProfileRepository.findByMentorId(mentorId)
                .orElseThrow(() -> new NotFoundException("mentorProfile"));

        return new GetMentorProfileResponse(mentorProfile);
    }

    @Transactional(readOnly = true)
    public ListMentorProfileResponse listMentorProfiles(ListMentorProfileRequest request) {
        Specification<MentorProfile> mentorProfileSpecification = MentorProfileRepository.createMentorProfileSpecification(request);
        List<MentorProfile> mentorProfiles = mentorProfileRepository.findAll(mentorProfileSpecification);
        return new ListMentorProfileResponse(mentorProfiles);
    }
}
