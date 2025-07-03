import { Button, Card, Col, Row, Space, Tag } from 'antd';
import '@/components/organisms/mentor-search/MentorCard.css';
import { useNavigate } from '@tanstack/react-router';
import type { MentorProfile, Skill } from '@/api/mentor';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';

interface MentorCardProps {
  mentor: MentorProfile;
}

export function MentorCard({ mentor }: MentorCardProps) {
  // getAverageRating(mentorId)

  // const {data: userData} = useGetUser({req: {userId: mentor.id}});

  return (
    <Card
      title={
        <Row>
          {/* TODO: add name once its updated in schema */}
          {/* <Col span={24}>{userData?.data.user?.userName}</Col> */}
          {mentor.mentorCategory !== undefined && (
            <Col span={24}>
              <MentorCategoryPill category={mentor.mentorCategory} />
            </Col>
          )}
        </Row>
      }
    >
      <Space direction="vertical">
        <div>
          <div style={{ fontWeight: 'bold' }}>About</div>
          <div className="mentorBio">{mentor.bio}</div>
        </div>
        {mentor.skills !== undefined && (
          <MentorSkillsSection skills={mentor.skills} />
        )}
        <ViewProfileButton mentor={mentor} />
      </Space>
    </Card>
  );
}

interface ViewProfileButtonProps {
  mentor: MentorProfile;
}

function ViewProfileButton({ mentor }: ViewProfileButtonProps) {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'right' }}>
      <Button
        type="primary"
        onClick={() => {
          if (mentor.mentorId !== undefined) {
            navigate({
              to: '/mentor/$mentorId',
              params: { mentorId: mentor.mentorId },
            });
          }
        }}
      >
        View Profile
      </Button>
    </div>
  );
}
