import {
  getListApplicationsQueryKey,
  MentorApplicationStatus,
  useAcceptApplication,
  useRejectApplication,
  type MentorApplication,
} from '@/api/mentor';
import { useGetUser, type User } from '@/api/user';
import { ApplicationCard } from '@/components/organisms/manage-view-applications/ApplicationCard';
import { getFullName } from '@/utils/getFullName';
import { UserOutlined } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar, Button, message, notification, Space, Typography } from 'antd';

interface MentorApplicationCardProps {
  application: MentorApplication;
}

export function MentorApplicationCard({
  application,
}: MentorApplicationCardProps) {
  const { data: getUserData } = useGetUser(
    { userId: application.mentorId! },
    { query: { enabled: !!application.mentorId } },
  );
  const queryClient = useQueryClient();

  const menteeUser = getUserData?.data?.user;

  const [messageApi, contextHolder] = message.useMessage();

  const { mutate: rejectApplication } = useRejectApplication();

  const { mutate: acceptApplication } = useAcceptApplication();

  const invalidateQueries = () => {
    queryClient.invalidateQueries({
      queryKey: getListApplicationsQueryKey({ mentorId: application.mentorId }),
    });
  };

  return (
    <>
      {contextHolder}
      <ApplicationCard
        application={application}
        personDetail={<MenteeSection menteeUser={menteeUser} />}
        showActionButtons={
          application.status === MentorApplicationStatus.PENDING
        }
        actionButtons={
          <Space>
            <Button
              type="primary"
              style={{ backgroundColor: '#ff4d4f', borderColor: '#ff4d4f' }}
              onClick={() =>
                rejectApplication(
                  { id: application.id! },
                  {
                    onSuccess: () => {
                      messageApi.success({ content: 'Application rejected' });
                      setTimeout(() => {
                        invalidateQueries();
                      }, 750);
                    },
                    onError: () => {
                      notification.error({
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
                      messageApi.success({
                        content: 'Application accepted',
                      });
                      setTimeout(() => {
                        invalidateQueries();
                      }, 750);
                    },
                    onError: () => {
                      notification.error({
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
    </>
  );
}

interface MenteeSectionProps {
  menteeUser?: User;
}

function MenteeSection({ menteeUser }: MenteeSectionProps) {
  const fullName = getFullName(menteeUser?.name);

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
