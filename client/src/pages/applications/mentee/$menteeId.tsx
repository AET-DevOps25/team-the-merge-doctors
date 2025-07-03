import {
  MentorApplicationStatus,
  useListApplications,
  type MentorApplication,
} from '@/api/mentor';
import { MenteeApplicationsList } from '@/components/organisms/manage-view-applications/mentee/MenteeApplicationsList';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { Layout, Tabs, Typography, type TabsProps } from 'antd';

export const Route = createFileRoute('/applications/mentee/$menteeId')({
  component: MenteeViewApplicationsPage,
});

export function MenteeViewApplicationsPage() {
  const menteeId = useParams({
    from: '/applications/mentee/$menteeId',
    select: (params) => params.menteeId,
  });

  const { data: applicationsData, isLoading: isLoadingApplications } =
    useListApplications({
      menteeId: menteeId,
    });

  const applications = applicationsData?.data?.applications ?? [];

  const pendingApplications = getPendingApplications(applications);
  const acceptedApplications = getAcceptedApplications(applications);
  const rejectedApplications = getRejectedApplications(applications);

  const tabItems: TabsProps['items'] = [
    {
      key: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      label: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      children: (
        <MenteeApplicationsList
          applications={acceptedApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
    {
      key: ViewApplicationTabs.PENDING_APPLICATIONS,
      label: ViewApplicationTabs.PENDING_APPLICATIONS,
      children: (
        <MenteeApplicationsList
          applications={pendingApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
    {
      key: ViewApplicationTabs.REJECTED_APPLICATIONS,
      label: ViewApplicationTabs.REJECTED_APPLICATIONS,
      children: (
        <MenteeApplicationsList
          applications={rejectedApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
  ];

  return (
    <Layout style={{ padding: 24 }}>
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        View Applications
      </Typography.Title>
      <Tabs
        defaultActiveKey={ViewApplicationTabs.ACCEPTED_APPLICATIONS}
        items={tabItems}
      ></Tabs>
      {/* <MenteeApplicationCard
        application={{
          menteeId: '123',
          mentorId: '1234',
          applicationMessage: 'test',
          summarizedApplicationMessage: 'test',
          status: MentorApplicationStatus.ACCEPTED,
        }}
      /> */}
    </Layout>
  );
}

export const ViewApplicationTabs = {
  REJECTED_APPLICATIONS: 'Rejected',
  PENDING_APPLICATIONS: 'Pending',
  ACCEPTED_APPLICATIONS: 'Accepted',
} as const;

export function getPendingApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.PENDING,
  );
}

export function getAcceptedApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.ACCEPTED,
  );
}

export function getRejectedApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.REJECTED,
  );
}
