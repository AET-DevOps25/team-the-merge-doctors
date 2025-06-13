import { Layout, Col, Card, Typography, Space, Flex } from 'antd';
import { createFileRoute } from '@tanstack/react-router';
import { MentorInfo } from '@/components/organisms/MentorInfo';
import { MentorStats } from '@/components/organisms/MentorStats';
import MentorSkills from '@/components/organisms/MentorSkills';
import { ExperienceTimeline } from '@/components/molecules/ExperienceTimeline';
import { MentorReviews } from '@/components/organisms/MentorReviews';
import type { Review } from '@/types/review';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/mentor/$mentorId')({
  component: MentorProfilePage,
});

function MentorProfilePage() {
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

  const availableSkills = [
    'Entrepreneurship',
    'Startup Strategy',
    'Business Validation',
    'Fundraising',
    'Growth Hacking',
    'Product Management',
    'Marketing Strategy',
    'Leadership',
    'JavaScript',
    'React',
    'Node.js',
    'Python',
    'Data Science',
    'Machine Learning',
    'UX Design',
    'UI Design',
    'Project Management',
    'Agile',
    'Scrum',
  ];

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

  const experience = [
    {
      title: 'CEO & Founder',
      company: 'Build Up Labs',
      period: '2018 - Present',
      description:
        'Leading a startup incubator that has helped 50+ startups raise over $20M in funding.',
    },
    {
      title: 'VP of Product',
      company: 'TechFlow Solutions',
      period: '2015 - 2018',
      description:
        'Scaled product from 0 to 1M users, led a team of 25+ product managers and engineers.',
    },
    {
      title: 'Senior Product Manager',
      company: 'Innovation Labs',
      period: '2012 - 2015',
      description:
        'Launched 3 successful products, increased user engagement by 150%.',
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Content style={{ padding: '40px 24px', justifyContent: 'center' }}>
        <Flex justify="center">
          <Col xs={24} lg={16}>
            {/* Profile Header */}
            <MentorInfo
              name={mentorData.name}
              title={mentorData.title}
              company={mentorData.company}
              location={mentorData.location}
              rating={mentorData.rating}
              totalReviews={mentorData.totalReviews}
              avatar={mentorData.avatar}
              isAvailable={mentorData.isAvailable}
            />

            {/* Stats */}
            <MentorStats
              totalMentees={mentorData.totalMentees}
              experience={mentorData.experience}
              languages={mentorData.languages}
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
                      I'm a serial entrepreneur and startup mentor with over 15
                      years of experience building and scaling companies. As the
                      CEO of Build Up Labs, I've helped over 50 startups
                      validate their ideas, build products, and raise funding.
                    </Paragraph>
                    <Paragraph style={{ fontSize: 16, lineHeight: 1.6 }}>
                      My expertise spans across business validation, product
                      development, growth strategies, and fundraising. I've
                      personally raised over $5M for my own ventures and helped
                      portfolio companies raise a combined $20M+.
                    </Paragraph>
                  </div>
                </Space>
              </Card>

              {/* Skills Section */}
              <Card style={{ borderRadius: 16 }}>
                <Title level={4}>Core Expertise</Title>
                <MentorSkills availableSkills={availableSkills} />
              </Card>

              {/* Experience Section */}
              <Card style={{ borderRadius: 16 }}>
                <Title level={4}>Professional Experience</Title>
                <ExperienceTimeline experiences={experience} />
              </Card>

              {/* Reviews Section */}
              <MentorReviews reviews={reviews} />
            </Space>
          </Col>
        </Flex>
      </Content>
    </Layout>
  );
}
