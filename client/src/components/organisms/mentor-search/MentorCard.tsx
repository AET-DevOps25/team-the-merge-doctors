import { Button, Card, Col, Row, Space } from 'antd';
import '@/components/organisms/mentor-search/MentorCard.css';
import { useNavigate } from '@tanstack/react-router';
import type { MentorProfile } from '@/api/mentor';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';

interface MentorCardProps {
  mentor: MentorProfile;
}

export function MentorCard({ mentor }: MentorCardProps) {
  // getAverageRating(mentorId)

  // const { data: userData } = useGetUser(
  //   { userId: mentor.mentorId! },
  //   { query: { enabled: !!mentor.mentorId } },
  // );

  return (
    <Card
      title={
        <Row>
          {/*<Col span={24}>{getFullName(userData?.data?.user?.name)}</Col> */}
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
        <div style={{ marginTop: 10 }}>
          <ViewProfileButton mentor={mentor} />
        </div>
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
  );
}
