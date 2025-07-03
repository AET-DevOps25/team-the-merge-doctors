import { useListApplications } from '@/api/mentor';
import { MentorApplicationsList } from '@/components/organisms/manage-view-applications/mentor/MentorApplicationList';
import {
  getAcceptedApplications,
  getPendingApplications,
  getRejectedApplications,
  ViewApplicationTabs,
} from '@/pages/applications/mentee/$menteeId';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { Layout, Tabs, Typography, type TabsProps } from 'antd';

export const Route = createFileRoute('/applications/mentor/$mentorId')({
  component: MentorManageApplicationsPage,
});

export function MentorManageApplicationsPage() {
  const mentorId = useParams({
    from: '/applications/mentor/$mentorId',
    select: (params) => params.mentorId,
  });

  const { data: applicationsData, isLoading: isLoadingApplications } =
    useListApplications({
      mentorId: mentorId,
    });

  const applications = applicationsData?.data?.applications ?? [];

  const pendingApplications = getPendingApplications(applications);
  const acceptedApplications = getAcceptedApplications(applications);
  const rejectedApplications = getRejectedApplications(applications);

  const tabItems: TabsProps['items'] = [
    {
      key: ViewApplicationTabs.PENDING_APPLICATIONS,
      label: ViewApplicationTabs.PENDING_APPLICATIONS,
      children: (
        <MentorApplicationsList
          applications={pendingApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
    {
      key: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      label: ViewApplicationTabs.ACCEPTED_APPLICATIONS,
      children: (
        <MentorApplicationsList
          applications={acceptedApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
    {
      key: ViewApplicationTabs.REJECTED_APPLICATIONS,
      label: ViewApplicationTabs.REJECTED_APPLICATIONS,
      children: (
        <MentorApplicationsList
          applications={rejectedApplications}
          isLoadingApplications={isLoadingApplications}
        />
      ),
    },
  ];

  return (
    <Layout style={{ padding: 24 }}>
      <Typography.Title level={2} style={{ marginBottom: 24 }}>
        Manage Applications
      </Typography.Title>
      <Tabs
        defaultActiveKey={ViewApplicationTabs.PENDING_APPLICATIONS}
        items={tabItems}
      />
      {/* <MentorApplicationCard
        application={{
          menteeId: '123',
          mentorId: '1234',
          applicationMessage: 'test',
          summarizedApplicationMessage: 'test',
          status: MentorApplicationStatus.PENDING,
        }}
      /> */}
    </Layout>
  );
}
