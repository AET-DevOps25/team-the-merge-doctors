import { Button, Card, Divider, Tag } from 'antd';
import type { Mentor, MentorCategory, Skill, User } from '../types/types';
import './MentorCard.css';

const mentor: Mentor = {
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
    { id: '123', name: 'Java' },
    { id: '234', name: 'Testing' },
    { id: '123', name: 'Python' },
    { id: '234', name: 'Swift' },
    { id: '123', name: 'DevOps' },
    { id: '234', name: 'C++' },
    { id: '123', name: 'git' },
  ],
};

const user: User = {
  id: '123',
  name: 'Peter Sagan',
  email: 'peter.sagan@gmail.com',
};

export function MentorCard() {
  // getAverageRating(mentorId)
  // getNumberOfReviews(mentorId)
  // getMentor(mentorId): should include categories, skills, bio, etc.

  return (
    <Card
      style={{ width: 400 }}
      title={
        <>
          {user.name}{' '}
          <MentorCategoryPill category={mentor.mentorCategory} />{' '}
        </>
      }
    >
      <MentorBio bioText={mentor.bio} />
      <p>
        Skills:{' '}
        {mentor.skills.map((skill) => (
          <SkillPill key={skill.id} skill={skill} />
        ))}
      </p>
      <ViewProfileButton mentor={mentor} />
    </Card>
  );
}

interface MentorBioProps {
  bioText: string;
}

function MentorBio({ bioText }: MentorBioProps) {
  return <div className="mentorBio">{bioText}</div>;
}

interface MentorCategoryPillProps {
  category: MentorCategory;
}

function MentorCategoryPill({ category }: MentorCategoryPillProps) {
  return (
    <Tag>
      {category.category.name}
      <Divider type="vertical" size="large" />
      {category.yearsOfExperience} years
    </Tag>
  );
}

interface SkillPillProps {
  skill: Skill;
}

function SkillPill({ skill }: SkillPillProps) {
  return <Tag>{skill.name}</Tag>;
}

interface ViewProfileButtonProps {
  mentor: Mentor;
}

function ViewProfileButton({ mentor }: ViewProfileButtonProps) {
  return (
    <Button
      onClick={() => {
        /*TODO: link to mentor profile*/
        console.log(mentor.mentorId);
      }}
    >
      View Profile
    </Button>
  );
}
