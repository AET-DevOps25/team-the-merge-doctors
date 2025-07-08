import {
  Layout,
  Col,
  Card,
  Typography,
  Space,
  Flex,
  Row,
  Statistic,
} from 'antd';
import { createFileRoute, useParams } from '@tanstack/react-router';
import { MentorInfo } from '@/components/organisms/MentorInfo';
import { useGetMentorProfile } from '@/api/mentor';
import { SkillPill } from '@/components/atoms/SkillPill';
import { SolutionOutlined, TrophyOutlined } from '@ant-design/icons';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

export const Route = createFileRoute('/mentor/$mentorId')({
  component: MentorProfilePage,
});

function MentorProfilePage() {
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

  // TODO: add getUser call with mentorId, pass user data to mentorinfo

  return (
    <Layout style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      <Content style={{ padding: '40px 24px', justifyContent: 'center' }}>
        <Flex justify="center">
          <Col xs={24} lg={16}>
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <MentorInfo
                  user={{}}
                  // rating={mentorData.rating}
                  // totalReviews={mentorData.totalReviews}
                  isAvailable={mentorProfile?.isAvailable ?? false}
                />
              </Col>
              <Col span={12}>
                <Card style={{ textAlign: 'center', borderRadius: 12 }}>
                  <Statistic
                    title="Category"
                    value={mentorProfile?.mentorCategory?.category?.name}
                    prefix={<SolutionOutlined />}
                  />
                </Card>
              </Col>
              <Col span={12}>
                <Card style={{ textAlign: 'center', borderRadius: 12 }}>
                  <Statistic
                    title="Experience"
                    value={`${mentorProfile?.mentorCategory?.yearsOfExperience}+ years`}
                    prefix={<TrophyOutlined />}
                  />
                </Card>
              </Col>
              <Col span={24}>
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
              </Col>
              <Col span={24}>
                {/* Skills Section */}
                <Card style={{ borderRadius: 16 }}>
                  <Title level={4}>Skills</Title>
                  {mentorProfile?.skills?.map((skill) => (
                    <SkillPill key={skill.id} skill={skill} />
                  ))}
                </Card>
              </Col>
              {/* TODO: add reviews back in */}
              {/* <MentorReviews reviews={reviews} /> */}
            </Row>
          </Col>
        </Flex>
      </Content>
    </Layout>
  );
}
