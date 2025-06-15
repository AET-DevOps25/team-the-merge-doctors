import { MentorCard } from '@/components/organisms/mentor-search/MentorCard';
import type { Mentor, User } from '@/types/types';
import { Space } from 'antd';

const mentor0: Mentor = {
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
  name: 'Peter Sagan',
  email: 'peter.sagan@gmail.com',
};

const mentor1: Mentor = {
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
  name: 'Sarah Lee',
  email: 'sarah.lee@gmail.com',
};

const mentor2: Mentor = {
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
  name: 'James Wong',
  email: 'james.wong@protonmail.com',
};

const mentors = [mentor0, mentor1, mentor2];

const users = [user0, user1, user2];

export function SearchMentorList() {
  return (
    <Space size="large" direction="vertical">
      {mentors.map((mentor, index) => (
        <MentorCard key={mentor.id} mentor={mentor} user={users[index]} />
      ))}
    </Space>
  );
}
