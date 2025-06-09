export type Mentor = {
  id: string;
  mentorId: string;
  bio: string;
  skills: Skill[];
  isAvailable: boolean;
  mentorCategory: MentorCategory;
};

export type Skill = {
  id: string;
  name: string;
};

export type MentorCategory = {
  category: Category;
  yearsOfExperience: number;
};

export type Category = {
  id: string;
  name: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
};
