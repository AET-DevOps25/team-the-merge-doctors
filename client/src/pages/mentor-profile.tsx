import { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Select,
  Switch,
  Typography,
  message,
  Card,
  Row,
  Col,
} from 'antd';
import {
  useListSkills,
  useListCategories,
  useCreateMentorProfile,
  type Skill,
  type Category,
} from '@/api/mentor';
import { createFileRoute } from '@tanstack/react-router';
import { jwtDecode } from 'jwt-decode';

const { Title } = Typography;

interface MentorProfileFormValues {
  bio: string;
  skills: string[];
  category: string;
  yearsOfExperience: number;
  isAvailable: boolean;
}

// Utility function to decode JWT token and extract userId
const getUserIdFromToken = (): string | null => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const decoded = jwtDecode<{
    sub: string;
    userId: string;
    role: string;
    exp: number;
  }>(token);
  return decoded.userId;
};

export const Route = createFileRoute('/mentor-profile')({
  component: CreateMentorProfilePage,
});
export function CreateMentorProfilePage() {
  const { data: listSkillsData } = useListSkills();
  const { data: listCategoriesData } = useListCategories();
  const skillOptions = (listSkillsData?.data?.skills ?? []).map(
    (skill: Skill) => ({
      label: skill.name,
      value: skill.id,
    }),
  );
  const mentorCategories = (listCategoriesData?.data?.categories ?? []).map(
    (cat: Category) => ({
      label: cat.name,
      value: cat.id,
    }),
  );
  const [form] = Form.useForm<MentorProfileFormValues>();
  const createMentorProfile = useCreateMentorProfile();
  const [loading, setLoading] = useState(false);

  const onFinish = (values: MentorProfileFormValues) => {
    const mentorId = getUserIdFromToken() ?? '';

    // Find the selected category to get its name
    const selectedCategory = mentorCategories.find(
      (cat) => cat.value === values.category,
    );

    setLoading(true);
    createMentorProfile
      .mutateAsync({
        data: {
          mentorProfile: {
            mentorId: mentorId,
            bio: values.bio,
            skills: values.skills?.map((id: string) => ({ id })),
            isAvailable: values.isAvailable,
            mentorCategory: {
              category: {
                id: values.category,
                name: selectedCategory?.label || '',
              },
              yearsOfExperience: values.yearsOfExperience,
            },
          },
        },
      })
      .then(() => {
        message.success('Mentor profile created!');
      })
      .catch(() => message.error('Failed to create mentor profile'))
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '24px',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Title level={1} style={{ marginBottom: '8px', color: '#1890ff' }}>
            Create Your Mentor Profile
          </Title>
          <Typography.Text type="secondary" style={{ fontSize: '16px' }}>
            Share your expertise and help others grow in their careers
          </Typography.Text>
        </div>

        <Card
          style={{
            borderRadius: '12px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: 'none',
          }}
        >
          <Form<MentorProfileFormValues>
            form={form}
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
            size="large"
          >
            <Row gutter={24}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Bio"
                  name="bio"
                  rules={[{ required: true, message: 'Please enter your bio' }]}
                >
                  <Input.TextArea
                    rows={4}
                    placeholder="Tell us about your background, expertise, and what you can help others with..."
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Skills"
                  name="skills"
                  rules={[
                    { required: true, message: 'Select at least one skill' },
                  ]}
                >
                  <Select
                    mode="multiple"
                    options={skillOptions}
                    placeholder="Select your skills"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Category"
                  name="category"
                  rules={[{ required: true, message: 'Select a category' }]}
                >
                  <Select
                    options={mentorCategories}
                    placeholder="Select your category"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} lg={12}>
                <Form.Item
                  label="Years of Experience"
                  name="yearsOfExperience"
                  rules={[
                    { required: true, message: 'Enter years of experience' },
                  ]}
                >
                  <Input
                    type="number"
                    min={0}
                    max={100}
                    placeholder="Years"
                    style={{ borderRadius: '8px' }}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              label="Available for mentorship?"
              name="isAvailable"
              valuePropName="checked"
              initialValue={true}
            >
              <Switch />
            </Form.Item>

            <Form.Item style={{ marginTop: '32px', marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                style={{
                  width: '100%',
                  height: '48px',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: 600,
                }}
              >
                Create Mentor Profile
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </div>
  );
}
