import type { MentorApplication, MentorApplicationStatus } from '@/api/mentor';
import { MessageOutlined } from '@ant-design/icons';
import { Card, Divider, Space, Tag } from 'antd';
import type { ReactNode } from 'react';

interface ApplicationCardProps {
  application: MentorApplication;
  showActionButtons: boolean;
  actionButtons: ReactNode;
  personDetail: ReactNode;
}

export function ApplicationCard({
  application,
  personDetail,
  showActionButtons,
  actionButtons,
}: ApplicationCardProps) {
  return (
    <Card
      title={
        <Space>
          Application
          <ApplicationStatusTag applicationStatus={application.status} />
        </Space>
      }
    >
      {personDetail}

      <Divider />

      <Space direction="vertical" size="small" style={{ width: '100%' }}>
        <Space align="center">
          <MessageOutlined style={{ color: '#1890ff' }} />
          <div>Application Summary</div>
        </Space>

        <div
          style={{
            margin: 0,
            backgroundColor: '#f5f5f5',
            padding: 12,
            borderRadius: 6,
          }}
        >
          {application.summarizedApplicationMessage ||
            application.applicationMessage ||
            'No summary available'}
        </div>
      </Space>

      {showActionButtons && <Divider />}

      {showActionButtons && actionButtons}
    </Card>
  );
}

interface ApplicationStatusTagProps {
  applicationStatus?: MentorApplicationStatus;
}

function ApplicationStatusTag({
  applicationStatus,
}: ApplicationStatusTagProps) {
  const statusColor = () => {
    switch (applicationStatus) {
      case 'PENDING':
        return 'yellow';
      case 'ACCEPTED':
        return 'green';
      case 'REJECTED':
        return 'red';
    }
  };

  return <Tag color={statusColor()}>{applicationStatus}</Tag>;
}
