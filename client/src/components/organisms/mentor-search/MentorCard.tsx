import { Button, Card, Space } from 'antd';
import '@/components/organisms/mentor-search/MentorCard.css';
import { useNavigate } from '@tanstack/react-router';
import type { MentorProfile } from '@/api/mentor';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';
import { useGetUser } from '@/api/user';
import { getFullName } from '@/utils/getFullName';
import { useGetAverageRating, useGetRatingsByMentor } from '@/api/rating';
import { StarFilled } from '@ant-design/icons';

interface MentorCardProps {
  mentor: MentorProfile;
}

export function MentorCard({ mentor }: MentorCardProps) {
  const { data: averageRatingData } = useGetAverageRating(mentor?.mentorId!, {
    query: { enabled: !!mentor.mentorId },
  });

  const { data: ratingsData } = useGetRatingsByMentor(mentor?.mentorId!, {
    query: { enabled: !!mentor.mentorId },
  });

  const { data: userData } = useGetUser(
    { userId: mentor.mentorId! },
    { query: { enabled: !!mentor.mentorId } },
  );

  const ratings = ratingsData?.data ?? [];
  const averageRating = averageRatingData?.data?.averageRating?.toFixed(1);

  return (
    <Card
      title={
        <Space direction="vertical" style={{ padding: 10 }}>
          <Space direction="horizontal" size={'large'}>
            {getFullName(userData?.data?.user?.name)}
            <div style={{ fontWeight: 'bold', marginLeft: 'auto' }}>
              {ratings.length === 0 ? undefined : (
                <div style={{ color: '#FFD700' }}>
                  {averageRating} <StarFilled />
                </div>
              )}
            </div>
          </Space>
          {mentor.mentorCategory !== undefined && (
            <MentorCategoryPill category={mentor.mentorCategory} />
          )}
        </Space>
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
      data-testid={`view-mentor-profile-${mentor.id}`}
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
