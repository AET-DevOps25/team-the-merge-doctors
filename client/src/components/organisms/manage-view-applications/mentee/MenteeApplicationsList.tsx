import type { MentorApplication } from '@/api/mentor';
import { MenteeApplicationCard } from '@/components/organisms/manage-view-applications/mentee/MenteeApplicationCard';
import { List } from 'antd';

interface MenteeApplicationsListProps {
  applications: MentorApplication[];
  isLoadingApplications: boolean;
}

export function MenteeApplicationsList({
  applications,
  isLoadingApplications,
}: MenteeApplicationsListProps) {
  return (
    <List
      dataSource={applications}
      loading={isLoadingApplications}
      locale={{ emptyText: 'No applications found' }}
      renderItem={(application) => {
        return (
          <div style={{ marginBottom: 16 }}>
            <MenteeApplicationCard
              key={application.id}
              application={application}
            />
          </div>
        );
      }}
    />
  );
}
