import type { MentorApplication } from '@/api/mentor';
import { MentorApplicationCard } from '@/components/organisms/manage-view-applications/mentor/MentorApplicationCard';
import { List } from 'antd';

interface MentorApplicationsListProps {
  applications: MentorApplication[];
  isLoadingApplications: boolean;
}

export function MentorApplicationsList({
  applications,
  isLoadingApplications,
}: MentorApplicationsListProps) {
  return (
    <List
      dataSource={applications}
      loading={isLoadingApplications}
      locale={{ emptyText: 'No applications found' }}
      renderItem={(application) => {
        return (
          <div style={{ marginBottom: 16 }}>
            <MentorApplicationCard
              key={application.id}
              application={application}
            />
          </div>
        );
      }}
    />
  );
}
