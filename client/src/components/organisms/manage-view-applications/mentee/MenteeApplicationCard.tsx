import {
  MentorApplicationStatus,
  useGetMentorProfile,
  type MentorApplication,
  type MentorProfile,
} from '@/api/mentor';
import { useGetUser, type UserDto } from '@/api/user';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';
import { ApplicationCard } from '@/components/organisms/manage-view-applications/ApplicationCard';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Row, Space, Typography } from 'antd';

interface MenteeApplicationCardProps {
  application: MentorApplication;
}

export function MenteeApplicationCard({
  application,
}: MenteeApplicationCardProps) {
  const { data: mentorProfileData } = useGetMentorProfile(
    { mentorId: application.mentorId! },
    { query: { enabled: !!application.mentorId } },
  );

  const { data: getUserData } = useGetUser(
    { userId: application.mentorId! },
    { query: { enabled: !!application.mentorId } },
  );

  const mentorUser = getUserData?.data?.user;
  const mentorProfile = mentorProfileData?.data?.profile;

  return (
    <ApplicationCard
      application={application}
      personDetail={
        <MentorSection mentorProfile={mentorProfile} mentorUser={mentorUser} />
      }
      showActionButtons={
        application.status === MentorApplicationStatus.ACCEPTED
      }
      actionButtons={
        <Space>
          <Button type="link" href={'mailto:' + mentorUser?.contact?.email}>
            Contact Mentor
          </Button>
          <Button
            type="primary"
            onClick={() => {
              // TODO: add ability to add rating
            }}
          >
            Rate Mentor
          </Button>
        </Space>
      }
    />
  );
}

interface MentorSectionProps {
  mentorProfile?: MentorProfile;
  mentorUser?: UserDto;
}

function MentorSection({ mentorProfile, mentorUser }: MentorSectionProps) {
  const fullName = `${mentorUser?.name?.title} ${mentorUser?.name?.firstName} ${mentorUser?.name?.lastName}`;

  const skillsNonEmpty =
    mentorProfile?.skills !== undefined && mentorProfile?.skills?.length >= 1;

  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Col span={12}>
        <Space align="start" size="large">
          <Avatar size={64} icon={<UserOutlined />} />
          <Space direction="vertical" size="small">
            <Typography.Title level={4} style={{ margin: 0 }}>
              {fullName}
            </Typography.Title>
            {mentorProfile?.mentorCategory && (
              <MentorCategoryPill category={mentorProfile?.mentorCategory} />
            )}
          </Space>
        </Space>
      </Col>
      <Col span={12}>
        {skillsNonEmpty && (
          <MentorSkillsSection skills={mentorProfile?.skills!} />
        )}
      </Col>
    </Row>
  );
}
