import { test as setup } from '@playwright/test';
import {
  createApplication,
  createCategory,
  createMentorProfile,
  createSkill,
} from '@/api/mentor';
import { skills } from 'tests/resources/skills';
import { categories } from 'tests/resources/categories';
import { rateMentor } from '@/api/rating';
import { ratings } from 'tests/resources/ratings';
import { applications } from 'tests/resources/applications';
import { users } from 'tests/resources/users';
import { createUser } from '@/api/user';
import { mentorProfiles } from 'tests/resources/profiles';

setup('setup system with mock users, skills, categories, etc.', async ({}) => {
  setup.setTimeout(240_000);

  for (const user of users) {
    try {
      const result = await createUser(user);
      console.info(`User created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create user:`, user);
      console.error(`Error response:`, error);
    }
  }

  for (const skill of skills) {
    try {
      const result = await createSkill(skill);
      console.info(`Skill created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create category:`, skill);
      console.error(`Error response:`, error);
    }
  }

  for (const category of categories) {
    try {
      const result = await createCategory(category);
      console.info(`Category created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create category:`, category);
      console.error(`Error response:`, error);
    }
  }

  for (const profile of mentorProfiles) {
    try {
      const result = await createMentorProfile({ mentorProfile: profile });
      console.info(`Mentor profile created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create mentor profile:`, profile);
      console.error(`Error response:`, error);
    }
  }

  for (const rating of ratings) {
    try {
      const result = await rateMentor(rating);
      console.info(`Rating created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create rating:`, rating);
      console.error(`Error response:`, error);
    }
  }

  for (const application of applications) {
    try {
      const result = await createApplication(application);
      console.info(`Application created:`, result.data, result.status);
    } catch (error) {
      console.error(`Failed to create application:`, application);
      console.error(`Error response:`, error);
    }
  }
});
