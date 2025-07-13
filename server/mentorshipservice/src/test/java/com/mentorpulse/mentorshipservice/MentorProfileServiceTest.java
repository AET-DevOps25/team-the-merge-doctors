package com.mentorpulse.mentorshipservice;

import com.mentorpulse.mentorshipservice.dto.service.*;
import com.mentorpulse.mentorshipservice.exceptions.*;
import com.mentorpulse.mentorshipservice.models.*;
import com.mentorpulse.mentorshipservice.repositories.*;
import com.mentorpulse.mentorshipservice.services.MentorProfileService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.jpa.domain.Specification;

import javax.management.InvalidAttributeValueException;
import java.util.*;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MentorProfileServiceTest {

    @Mock
    private MentorProfileRepository mentorProfileRepository;
    @Mock
    private CategoryRepository categoryRepository;
    @Mock
    private SkillRepository skillRepository;

    @InjectMocks
    private MentorProfileService service;

    @Nested
    @DisplayName("createSkill")
    class CreateSkillTests {
        @Test
        void validSkill_succeeds() throws Exception {
            var req = new CreateSkillRequest(null, "Java");
            when(skillRepository.existsSkillByName("Java")).thenReturn(false);
            var saved = new Skill(UUID.randomUUID(), "Java");
            when(skillRepository.save(any())).thenReturn(saved);

            CreateSkillResponse resp = service.createSkill(req);
            assertThat(resp.skill().getId()).isEqualTo(saved.getId());
            assertThat(resp.skill().getName()).isEqualTo("Java");
        }

        @Test
        void nullOrEmptyName_throwsInvalidArguments() {
            assertThatThrownBy(() -> service.createSkill(new CreateSkillRequest(null, null)))
                    .isInstanceOf(InvalidArgumentsException.class)
                    .hasMessageContaining("skill");

            assertThatThrownBy(() -> service.createSkill(new CreateSkillRequest(null, "  ")))
                    .isInstanceOf(InvalidArgumentsException.class)
                    .hasMessageContaining("skill");
        }

        @Test
        void duplicateSkill_throwsAlreadyExists() {
            var req = new CreateSkillRequest(null, "Python");
            when(skillRepository.existsSkillByName("Python")).thenReturn(true);
            assertThatThrownBy(() -> service.createSkill(req))
                    .isInstanceOf(AlreadyExistsException.class)
                    .hasMessageContaining("skill");
        }
    }

    @Nested
    @DisplayName("listSkills")
    class ListSkillTests {
        @Test
        void returnsAllSkills() {
            var list = List.of(new Skill(UUID.randomUUID(), "Go"));
            when(skillRepository.findAll()).thenReturn(list);

            ListSkillResponse resp = service.listSkills();
            assertThat(resp.skills()).hasSize(1).extracting(Skill::getName).containsExactly("Go");
        }
    }

    @Nested
    @DisplayName("createCategory")
    class CreateCategoryTests {
        @Test
        void validCategory_succeeds() throws Exception {
            var req = new CreateCategoryRequest(null, "Cloud");
            when(categoryRepository.existsCategoryByName("Cloud")).thenReturn(false);
            var saved = new Category(UUID.randomUUID(), "Cloud");
            when(categoryRepository.save(any())).thenReturn(saved);

            CreateCategoryResponse resp = service.createCategory(req);
            assertThat(resp.category().getName()).isEqualTo("Cloud");
        }

        @Test
        void nullOrEmptyCategory_throwsInvalidArguments() {
            assertThatThrownBy(() -> service.createCategory(new CreateCategoryRequest(null, null)))
                    .isInstanceOf(InvalidArgumentsException.class)
                    .hasMessageContaining("category");
        }

        @Test
        void duplicateCategory_throwsAlreadyExists() {
            var req = new CreateCategoryRequest(null, "Data");
            when(categoryRepository.existsCategoryByName("Data")).thenReturn(true);
            assertThatThrownBy(() -> service.createCategory(req))
                    .isInstanceOf(AlreadyExistsException.class)
                    .hasMessageContaining("category");
        }
    }

    @Nested
    @DisplayName("listCategories")
    class ListCategoryTests {
        @Test
        void returnsAllCategories() {
            var list = List.of(new Category(UUID.randomUUID(), "DevOps"));
            when(categoryRepository.findAll()).thenReturn(list);

            ListCategoryResponse resp = service.listCategories();
            assertThat(resp.categories()).hasSize(1).extracting(Category::getName).containsExactly("DevOps");
        }
    }

    @Nested
    @DisplayName("createMentorProfile")
    class CreateMentorProfileTests {
        @Test
        void validProfile_succeeds() throws Exception {
            MentorProfile profile = MentorProfile.builder()
                    .mentorId(UUID.randomUUID())
                    .build();
            var req = new CreateMentorProfileRequest(profile);
            when(mentorProfileRepository.existsMentorProfileByMentorId(profile.getMentorId()))
                    .thenReturn(false);
            when(mentorProfileRepository.save(any())).thenAnswer(i -> {
                var p = i.getArgument(0);
                return p;
            });

            CreateMentorProfileResponse resp = service.createMentorProfile(req);
            assertThat(resp.mentorProfile().getMentorId()).isEqualTo(profile.getMentorId());
        }

        @Test
        void nullMentorId_throwsInvalidArguments() {
            var req = new CreateMentorProfileRequest(new MentorProfile());
            assertThatThrownBy(() -> service.createMentorProfile(req))
                    .isInstanceOf(InvalidArgumentsException.class)
                    .hasMessageContaining("mentorId");
        }

        @Test
        void duplicateProfile_throwsAlreadyExists() {
            UUID mid = UUID.randomUUID();
            var req = new CreateMentorProfileRequest(
                    MentorProfile.builder().mentorId(mid).build()
            );
            when(mentorProfileRepository.existsMentorProfileByMentorId(mid)).thenReturn(true);
            assertThatThrownBy(() -> service.createMentorProfile(req))
                    .isInstanceOf(AlreadyExistsException.class)
                    .hasMessageContaining("mentorId");
        }
    }

    @Nested
    @DisplayName("updateMentorProfile")
    class UpdateMentorProfileTests {
        @Test
        void validUpdate_succeeds() throws Exception {
            var id = UUID.randomUUID();
            MentorProfile existing = new MentorProfile();
            existing.setId(id);
            existing.setMentorId(UUID.randomUUID());
            when(mentorProfileRepository.findById(id)).thenReturn(Optional.of(existing));

            MentorProfile updated = new MentorProfile();
            updated.setId(id);
            updated.setMentorId(existing.getMentorId());
            var req = new UpdateMentorProfileRequest(updated);
            when(mentorProfileRepository.save(updated)).thenReturn(updated);

            UpdateMentorProfileResponse resp = service.updateMentorProfile(req);
            assertThat(resp.mentorProfile().getId()).isEqualTo(id);
        }

        @Test
        void changeMentorId_throwsInvalidArguments() {
            var id = UUID.randomUUID();
            MentorProfile existing = new MentorProfile(); existing.setId(id); existing.setMentorId(UUID.randomUUID());
            when(mentorProfileRepository.findById(id)).thenReturn(Optional.of(existing));

            MentorProfile updated = new MentorProfile(); updated.setId(id);
            updated.setMentorId(UUID.randomUUID());
            var req = new UpdateMentorProfileRequest(updated);
            assertThatThrownBy(() -> service.updateMentorProfile(req))
                    .isInstanceOf(InvalidArgumentsException.class)
                    .hasMessageContaining("mentorId");
        }

        @Test
        void nonExistent_throwsInvalidAttributeValue() {
            var req = new UpdateMentorProfileRequest(new MentorProfile());
            assertThatThrownBy(() -> service.updateMentorProfile(req))
                    .isInstanceOf(InvalidAttributeValueException.class);
        }
    }

    @Nested
    @DisplayName("deleteMentorProfile")
    class DeleteMentorProfileTests {
        @Test
        void validDelete_succeeds() throws Exception {
            var id = UUID.randomUUID();
            MentorProfile existing = new MentorProfile(); existing.setId(id);
            when(mentorProfileRepository.findById(id)).thenReturn(Optional.of(existing));

            DeleteMentorProfileResponse resp = service.deleteMentorProfile(
                    new DeleteMentorProfileRequest(id)
            );
            verify(mentorProfileRepository).delete(existing);
            assertThat(resp.mentorProfile().getId()).isEqualTo(id);
        }

        @Test
        void nonExistent_throwsInvalidAttributeValue() {
            when(mentorProfileRepository.findById(any())).thenReturn(Optional.empty());
            assertThatThrownBy(() -> service.deleteMentorProfile(
                    new DeleteMentorProfileRequest(UUID.randomUUID())))
                    .isInstanceOf(InvalidAttributeValueException.class);
        }
    }

    @Nested
    @DisplayName("getMentorProfile")
    class GetMentorProfileTests {
        @Test
        void validGet_succeeds() throws Exception {
            UUID mid = UUID.randomUUID();
            MentorProfile existing = new MentorProfile(); existing.setMentorId(mid);
            when(mentorProfileRepository.findByMentorId(mid)).thenReturn(Optional.of(existing));

            GetMentorProfileResponse resp = service.getMentorProfile(mid);
            assertThat(resp.profile().getMentorId()).isEqualTo(mid);
        }

        @Test
        void nullId_throwsInvalidArguments() {
            assertThatThrownBy(() -> service.getMentorProfile(null))
                    .isInstanceOf(InvalidArgumentsException.class);
        }

        @Test
        void notFound_throwsNotFound() {
            UUID mid = UUID.randomUUID();
            when(mentorProfileRepository.findByMentorId(mid)).thenReturn(Optional.empty());
            assertThatThrownBy(() -> service.getMentorProfile(mid))
                    .isInstanceOf(NotFoundException.class);
        }
    }

    @Nested
    @DisplayName("listMentorProfiles")
    class ListMentorProfilesTests {
        @Test
        void returnsFilteredList() {
            ListMentorProfileRequest req = new ListMentorProfileRequest(null, null, null);
            List<MentorProfile> list = List.of(new MentorProfile());
            when(mentorProfileRepository.findAll(any(Specification.class))).thenReturn(list);

            ListMentorProfileResponse resp = service.listMentorProfiles(req);
            assertThat(resp.mentorProfiles()).hasSize(1);
        }
    }
}
