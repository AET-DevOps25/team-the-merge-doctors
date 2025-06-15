import { Button, Card, Col, Divider, Row, Space, Tag } from 'antd';
import type { Mentor, MentorCategory, Skill, User } from '@/types/types';
import '@/components/organisms/mentor-search/MentorCard.css';
import { useNavigate } from '@tanstack/react-router';

interface MentorCardProps {
  mentor: Mentor;
  user: User;
}

export function MentorCard({ mentor, user }: MentorCardProps) {
  // getAverageRating(mentorId)
  // getNumberOfReviews(mentorId)
  // getMentor(mentorId): should include categories, skills, bio, etc.

  return (
    <Card
      // style={{ width: 500 }}
      title={
        <Row>
          <Col span={24}>{user.name} </Col>
          <Col span={24}>
            <MentorCategoryPill category={mentor.mentorCategory} />
          </Col>
        </Row>
      }
    >
      <Space direction="vertical">
        <MentorBio bioText={mentor.bio} />
        <MentorSkills skills={mentor.skills} />
        <ViewProfileButton mentor={mentor} />
      </Space>
    </Card>
  );
}

interface MentorBioProps {
  bioText: string;
}

function MentorBio({ bioText }: MentorBioProps) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>About</div>
      <div className="mentorBio">{bioText}</div>
    </div>
  );
}

interface MentorSkillsProps {
  skills: Skill[];
}

function MentorSkills({ skills }: MentorSkillsProps) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Skills</div>
      {skills.map((skill) => (
        <SkillPill key={skill.id} skill={skill} />
      ))}
    </div>
  );
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
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        type="primary"
        onClick={() => {
          /*TODO: remove static link*/
          navigate({ to: '/mentor/$mentorId', params: { mentorId: '123' } });
        }}
      >
        View Profile
      </Button>
    </div>
  );
}
