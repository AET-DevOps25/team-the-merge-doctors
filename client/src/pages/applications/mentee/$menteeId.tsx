import { MentorApplicationStatus, useListApplications } from '@/api/mentor';
import { MenteeApplicationsList } from '@/components/organisms/MenteeApplicationsList';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { Tabs, type TabsProps } from 'antd';

export const Route = createFileRoute('/applications/mentee/$menteeId')({
  component: MenteeViewApplicationsPage,
});

export function MenteeViewApplicationsPage() {
  const menteeId = useParams({
    from: '/applications/mentee/$menteeId',
    select: (params) => params.menteeId,
  });

  const { data: applicationsData } = useListApplications({
    menteeId: menteeId,
  });

  const applications = applicationsData?.data?.applications ?? [];

  const pendingApplications = applications.filter(
    (application) => application.status === MentorApplicationStatus.PENDING,
  );
  const acceptedApplications = applications.filter(
    (application) => application.status === MentorApplicationStatus.ACCEPTED,
  );
  const rejectedApplications = applications.filter(
    (application) => application.status === MentorApplicationStatus.REJECTED,
  );

  const tabItems: TabsProps['items'] = [
    {
      key: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      label: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      children: <MenteeApplicationsList applications={acceptedApplications} />,
    },
    {
      key: ViewApplicationTabs.PENDING_APPLICATIONS,
      label: ViewApplicationTabs.PENDING_APPLICATIONS,
      children: <MenteeApplicationsList applications={pendingApplications} />,
    },
    {
      key: ViewApplicationTabs.REJECTED_APPLICATIONS,
      label: ViewApplicationTabs.REJECTED_APPLICATIONS,
      children: <MenteeApplicationsList applications={rejectedApplications} />,
    },
  ];

  return (
    <Tabs
      defaultActiveKey={ViewApplicationTabs.ACCEPTED_APPLICATIONS}
      items={tabItems}
    ></Tabs>
  );
}

const ViewApplicationTabs = {
  REJECTED_APPLICATIONS: 'Rejected',
  PENDING_APPLICATIONS: 'Pending',
  ACCEPTED_APPLICATIONS: 'Accepted',
} as const;
