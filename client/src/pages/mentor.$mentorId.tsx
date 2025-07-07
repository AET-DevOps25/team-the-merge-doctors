import { Layout, Col, Card, Typography, Space, Flex } from 'antd';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { MentorInfo } from '@/components/organisms/MentorInfo';
import { MentorStats } from '@/components/organisms/MentorStats';
import MentorSkills from '@/components/organisms/MentorSkills';
import { MentorReviews } from '@/components/organisms/MentorReviews';
import type { Review } from '@/types/review';
import { useGetMentorProfile, useListSkills } from '@/api/mentor';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/mentor/$mentorId')({
  component: MentorProfilePage,
});

function MentorProfilePage() {
  const { data: listSkillsData } = useListSkills();

  const availableSkills = listSkillsData?.data?.skills ?? [];

  const mentorId = useParams({
    from: '/mentor/$mentorId',
    select: (params) => params.mentorId,
  });

  const { data: mentorProfileData } = useGetMentorProfile(
    {
      mentorId: mentorId,
    },
    {
      query: {
        enabled: !!mentorId,
      },
    },
  );

  const mentorProfile = mentorProfileData?.data.profile;

  const mentorData = {
    name: 'Rui Gouveia',
    title: 'CEO & Startup Incubator Expert',
    company: 'Avelios Medical',
    location: 'Munich, Germany',
    rating: 4.9,
    totalReviews: 47,
    totalMentees: 120,
    responseTime: '2 hours',
    languages: ['English', 'Portuguese', 'Spanish'],
    timezone: 'GMT+1 (Lisbon)',
    experience: '15+ years',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    isAvailable: true,
    isTopMentor: true,
  };

  const reviews: Review[] = [
    {
      name: 'Sarah Chen',
      rating: 5,
      date: '2 weeks ago',
      text: 'Rui provided incredible insights into startup validation. His experience really shows and he gave me actionable advice that I implemented immediately.',
      avatar:
        'https://images.unsplash.com/photo-1494790108755-2616b612b000?w=40&h=40&fit=crop&crop=face',
    },
    {
      name: 'Marcus Johnson',
      rating: 5,
      date: '1 month ago',
      text: 'Outstanding mentor! Helped me navigate the complexities of raising seed funding. Worth every penny.',
      avatar:
        'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=40&h=40&fit=crop&crop=face',
    },
    {
      name: 'Elena Rodriguez',
      rating: 5,
      date: '1 month ago',
      text: "Rui's guidance was instrumental in helping me pivot my startup strategy. Highly recommended!",
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
    },
  ];

  // TODO: remove dummy data
  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Content style={{ padding: '40px 24px', justifyContent: 'center' }}>
        <Flex justify="center">
          <Col xs={24} lg={16}>
            {/* Profile Header */}
            <MentorInfo
              name={mentorData.name}
              // title={mentorData.title}
              // company={mentorData.company}
              location={'DUMMY_LOCATION'}
              // rating={mentorData.rating}
              // totalReviews={mentorData.totalReviews}
              // avatar={mentorData.avatar}
              isAvailable={mentorProfile?.isAvailable ?? false}
            />

            {/* Stats */}
            <MentorStats
              // totalMentees={mentorData.totalMentees}
              category={mentorProfile?.mentorCategory?.category?.name ?? ''}
              experience={
                mentorProfile?.mentorCategory?.yearsOfExperience?.toString() ||
                '0'
              }
              // languages={mentorData.languages}
            />

            {/* Content Sections */}
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {/* About Section */}
              <Card style={{ borderRadius: 16 }}>
                <Space
                  direction="vertical"
                  size="large"
                  style={{ width: '100%' }}
                >
                  <div>
                    <Title level={4}>About Me</Title>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                      {mentorProfile?.bio}
                    </Paragraph>
                  </div>
                </Space>
              </Card>

              {/* Skills Section */}
              <Card style={{ borderRadius: 16 }}>
                <Title level={4}>Core Expertise</Title>
                <MentorSkills
                  availableSkills={availableSkills}
                  initialSkills={mentorProfile?.skills ?? []}
                />
              </Card>

              {/* Experience Section */}
              {/* <Card style={{ borderRadius: 16 }}>
                <Title level={4}>Professional Experience</Title>
                <ExperienceTimeline experiences={mentorProfile} />
              </Card> */}

              {/* Reviews Section */}
              <MentorReviews reviews={reviews} />
            </Space>
          </Col>
        </Flex>
      </Content>
    </Layout>
  );
}
