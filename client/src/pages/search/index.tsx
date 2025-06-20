import { createFileRoute } from '@tanstack/react-router';
import { Col, Divider, Layout, Row, Space, Spin } from 'antd';
import { SearchFilter } from '@/components/molecules/SearchFilter';
import {
  type ComparisonFilter,
  useListCategories,
  useListMentorProfiles,
  useListSkills,
  type Category,
  type Skill,
  type MentorProfile,
} from '@/api/mentor';
import { useState } from 'react';
import { MentorCard } from '@/components/organisms/mentor-search/MentorCard';
import type { User } from '@/api/user';
import { YearsOfExperienceFilter } from '@/components/molecules/YearsOfExperienceFilter';

export const Route = createFileRoute('/search/')({
  component: Search,
});

const skills: Skill[] = [
  { id: '1', name: 'Testing' },
  { id: '2', name: 'Swift' },
  { id: '3', name: 'Java' },
  { id: '4', name: 'C++' },
  { id: '5', name: 'C' },

  // Software Engineering / Development
  { id: '6', name: 'Python' },
  { id: '7', name: 'JavaScript' },
  { id: '8', name: 'TypeScript' },
  { id: '9', name: 'React' },
  { id: '10', name: 'Node.js' },
  { id: '11', name: 'Kotlin' },
  { id: '12', name: 'Go' },
  { id: '13', name: 'Rust' },

  // DevOps / Infrastructure
  { id: '14', name: 'Docker' },
  { id: '15', name: 'Kubernetes' },
  { id: '16', name: 'AWS' },
  { id: '17', name: 'Terraform' },
  { id: '18', name: 'CI/CD' },

  // Data Science / Analytics
  { id: '19', name: 'SQL' },
  { id: '20', name: 'Pandas' },
  { id: '21', name: 'R' },
  { id: '22', name: 'Tableau' },
  { id: '23', name: 'Power BI' },
  { id: '24', name: 'Data Visualization' },
  { id: '25', name: 'Machine Learning' },

  // Design / Creative
  { id: '26', name: 'Figma' },
  { id: '27', name: 'Adobe Photoshop' },
  { id: '28', name: 'Adobe Illustrator' },
  { id: '29', name: 'UI/UX Design' },
  { id: '30', name: 'Prototyping' },

  // Business / Management
  { id: '31', name: 'Project Management' },
  { id: '32', name: 'Agile Methodology' },
  { id: '33', name: 'Scrum' },
  { id: '34', name: 'Business Strategy' },
  { id: '35', name: 'Market Research' },

  // Soft Skills / Professional
  { id: '36', name: 'Communication' },
  { id: '37', name: 'Teamwork' },
  { id: '38', name: 'Leadership' },
  { id: '39', name: 'Problem Solving' },
  { id: '40', name: 'Time Management' },
];

const categories: Category[] = [
  { id: '1', name: 'Engineer' },
  { id: '2', name: 'Founder' },
  { id: '3', name: 'Testing Person' },
  { id: '4', name: 'Marketing Genius' },
  { id: '5', name: 'Marketing Magician' },

  // Expanded & normalized list
  { id: '6', name: 'Software Engineer' },
  { id: '7', name: 'Data Scientist' },
  { id: '8', name: 'Product Manager' },
  { id: '9', name: 'UX Designer' },
  { id: '10', name: 'UI Designer' },
  { id: '11', name: 'Graphic Designer' },
  { id: '12', name: 'DevOps Engineer' },
  { id: '13', name: 'Quality Assurance Engineer' },
  { id: '14', name: 'Technical Writer' },
  { id: '15', name: 'Frontend Developer' },
  { id: '16', name: 'Backend Developer' },
  { id: '17', name: 'Full Stack Developer' },
  { id: '18', name: 'Mobile Developer' },
  { id: '19', name: 'Data Analyst' },
  { id: '20', name: 'Machine Learning Engineer' },

  // Business & Operations
  { id: '21', name: 'Business Analyst' },
  { id: '22', name: 'Operations Manager' },
  { id: '23', name: 'Sales Executive' },
  { id: '24', name: 'Account Manager' },
  { id: '25', name: 'Customer Success Manager' },

  // Marketing & Creative
  { id: '26', name: 'Marketing Manager' },
  { id: '27', name: 'Content Strategist' },
  { id: '28', name: 'SEO Specialist' },
  { id: '29', name: 'Social Media Manager' },
  { id: '30', name: 'Brand Strategist' },

  // Executive / Leadership
  { id: '31', name: 'CTO' },
  { id: '32', name: 'CEO' },
  { id: '33', name: 'CFO' },
  { id: '34', name: 'COO' },
  { id: '35', name: 'Head of Engineering' },
  { id: '36', name: 'Head of Marketing' },

  // Support / Others
  { id: '37', name: 'Technical Support' },
  { id: '38', name: 'Recruiter' },
  { id: '39', name: 'HR Manager' },
  { id: '40', name: 'Legal Counsel' },
];

const mentor0: MentorProfile = {
  id: '123',
  mentorId: '123',
  bio: `Hi, I'm Peter, and I bring over 3 years of experience in Software Engineering. Throughout my career, I've worn many hats—including testing—which has given me a broad perspective and a practical approach to problem-solving.
    Mentoring is something I’m deeply passionate about. I believe in creating a supportive, honest, and growth-focused environment where mentees feel empowered to ask questions, take risks, and pursue their goals with clarity. My approach is grounded in active listening, constructive feedback, and real-world advice.
    Outside of work, I enjoy [a hobby or two], and I’m always eager to learn something new. I’m here to help you grow, gain confidence, and navigate your journey—wherever it leads.`,
  isAvailable: true,
  mentorCategory: {
    category: {
      id: 'category1',
      name: 'Software Engineer',
    },
    yearsOfExperience: 3,
  },
  skills: [
    { id: '1', name: 'Java' },
    { id: '2', name: 'Testing' },
    { id: '3', name: 'Python' },
    { id: '4', name: 'Swift' },
    { id: '5', name: 'DevOps' },
    { id: '6', name: 'C++' },
    { id: '7', name: 'git' },
  ],
};

const user0: User = {
  id: '123',
  // name: 'Peter Sagan',
  // email: 'peter.sagan@gmail.com',
};

const mentor1: MentorProfile = {
  id: '124',
  mentorId: '124',
  bio: `I’m Sarah, a frontend engineer with 5 years of experience in building responsive, accessible web apps. I enjoy mentoring developers new to React and JavaScript.`,
  isAvailable: true,
  mentorCategory: {
    category: {
      id: 'category2',
      name: 'Frontend Developer',
    },
    yearsOfExperience: 5,
  },
  skills: [
    { id: '1', name: 'React' },
    { id: '2', name: 'TypeScript' },
    { id: '3', name: 'HTML/CSS' },
    { id: '4', name: 'Accessibility' },
  ],
};

const user1: User = {
  id: '124',
  // name: 'Sarah Lee',
  // email: 'sarah.lee@gmail.com',
};

const mentor2: MentorProfile = {
  id: '125',
  mentorId: '125',
  bio: `Backend specialist with 7+ years in cloud architecture and databases. I focus on helping engineers write clean, scalable code.`,
  isAvailable: false,
  mentorCategory: {
    category: {
      id: 'category3',
      name: 'Backend Engineer',
    },
    yearsOfExperience: 7,
  },
  skills: [
    { id: '1', name: 'Node.js' },
    { id: '2', name: 'PostgreSQL' },
    { id: '3', name: 'AWS' },
    { id: '4', name: 'Docker' },
  ],
};

const user2: User = {
  id: '125',
  name: { name: 'James Wong' },
  contact: { email: 'james.wong@protonmail.com' },
};

const mentors = [mentor0, mentor1, mentor2];

const users = [user0, user1, user2];

export function Search() {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [selectedExperienceFilter, setSelectedExperienceFilter] =
    useState<ComparisonFilter>();

  const { data: listSkillsData, isLoading: listSkillsDataLoading } =
    useListSkills({ request: {} });

  const { data: listCategoriesData, isLoading: listCategoriesDataLoading } =
    useListCategories({ request: {} });

  const { data: listMentorsData, isLoading: listMentorsIsLoading } =
    useListMentorProfiles({
      request: {
        categoryIds: selectedCategories
          .map((category) => category.id)
          .filter((id) => id !== undefined && id !== null),
        skillIds: selectedSkills
          .map((skill) => skill.id)
          .filter((id) => id !== undefined && id !== null),
      },
    });

  return (
    <Layout style={{ height: '100vh', padding: 24, overflow: 'hidden' }}>
      <Row gutter={24} style={{ height: '100%', overflow: 'hidden' }}>
        <Col
          xs={24}
          sm={6}
          md={6}
          lg={5}
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingRight: 16,
          }}
        >
          {listCategoriesDataLoading || listSkillsDataLoading ? (
            <Spin />
          ) : (
            <>
              <SearchFilter
                placeholder="Search for categories"
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
                items={skills ?? []}
                title="Categories"
              />
              <Divider />
              <SearchFilter
                placeholder="Search for skills"
                selectedItems={selectedSkills}
                setSelectedItems={setSelectedSkills}
                items={categories ?? []}
                title="Skills"
              />
              <Divider />
              <YearsOfExperienceFilter
                selectedExperienceFilter={selectedExperienceFilter}
                setSelectedExperienceFilter={setSelectedExperienceFilter}
              />
              <div style={{ height: 50 }} />
            </>
          )}
        </Col>
        <Col
          xs={24}
          sm={18}
          md={18}
          lg={19}
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingLeft: 16,
          }}
        >
          {listMentorsIsLoading ? (
            <Spin />
          ) : (
            <Space size="large" direction="vertical">
              {mentors?.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </Space>
          )}
          <div style={{ height: 50 }} />
        </Col>
      </Row>
    </Layout>
  );
}
