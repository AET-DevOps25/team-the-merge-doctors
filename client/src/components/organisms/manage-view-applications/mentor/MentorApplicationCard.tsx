import {
  MentorApplicationStatus,
  useAcceptApplication,
  useGetMentorProfile,
  useRejectApplication,
  type MentorApplication,
  type MentorProfile,
} from '@/api/mentor';
import type { User } from '@/api/user';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';
import { ApplicationCard } from '@/components/organisms/manage-view-applications/ApplicationCard';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  notification,
  Row,
  Space,
  Typography,
} from 'antd';
import { useEffect } from 'react';

interface MentorApplicationCardProps {
  application: MentorApplication;
}

export function MentorApplicationCard({
  application,
}: MentorApplicationCardProps) {
  // TODO: add getUser after schema was updated to get the user (get mentee)
  // const { } = useGetUser({userId: })

  const { mutate: rejectApplication } = useRejectApplication();

  const { mutate: acceptApplication } = useAcceptApplication();

  const [api, contextHolder] = notification.useNotification();

  const menteeUser: User = {
    id: 'dad02741-84d9-4300-8e8a-a8c47fb690af',
    username: 'umartinez',
    password: 'N3HncEW(!9',
    name: {
      title: 'Prof.',
      firstName: 'Claire',
      middleName: 'Jennifer',
      lastName: 'Martinez',
    },
    contact: {
      email: 'johnstonblake@example.net',
      phoneNumber: '+1-505-902-2507x777',
      mobileNumber: '+1-695-712-1283x7462',
    },
    address: {
      city: 'North Brandon',
      country: 'Chad',
    },
    roleType: 'MENTEE',
  };

  return (
    <ApplicationCard
      application={application}
      personDetail={<MenteeSection menteeUser={menteeUser} />}
      showActionButtons={application.status === MentorApplicationStatus.PENDING}
      actionButtons={
        <Space>
          {contextHolder}
          <Button
            type="primary"
            style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
            onClick={() =>
              rejectApplication(
                { id: application.id! },
                {
                  onSuccess: () => {
                    api.success({
                      message: 'Application rejected successfully.',
                    });
                  },
                  onError: () => {
                    api.error({
                      message:
                        'Failed to reject application. Please try again.',
                    });
                  },
                },
              )
            }
          >
            Reject Application
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: '#52c41a', borderColor: '#52c41a' }}
            onClick={() =>
              acceptApplication(
                { id: application.id! },
                {
                  onSuccess: () => {
                    api.success({
                      message: 'Application accepted successfully.',
                    });
                  },
                  onError: () => {
                    api.error({
                      message:
                        'Failed to accept application. Please try again.',
                    });
                  },
                },
              )
            }
          >
            Accept Application
          </Button>
        </Space>
      }
    />
  );
}

interface MenteeSectionProps {
  menteeUser?: User;
}

function MenteeSection({ menteeUser }: MenteeSectionProps) {
  const fullName = `${menteeUser?.name?.title} ${menteeUser?.name?.firstName} ${menteeUser?.name?.lastName}`;

  return (
    <Space align="center" size="large">
      <Avatar size={64} icon={<UserOutlined />} />
      <Space direction="vertical" size="small">
        <Typography.Title level={4} style={{ margin: 0 }}>
          {fullName}
        </Typography.Title>
      </Space>
    </Space>
  );
}
