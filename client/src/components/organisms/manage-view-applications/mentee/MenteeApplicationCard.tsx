import {
  MentorApplicationStatus,
  useGetMentorProfile,
  type MentorApplication,
  type MentorProfile,
} from '@/api/mentor';
import { useRateMentor } from '@/api/rating';
import { useGetUser, type UserDto } from '@/api/user';
import { MentorCategoryPill } from '@/components/atoms/MentorCategoryPill';
import { MentorSkillsSection } from '@/components/atoms/MentorSkillsSection';
import { ApplicationCard } from '@/components/organisms/manage-view-applications/ApplicationCard';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { UserOutlined } from '@ant-design/icons';
import {
  Avatar,
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import { useState, type Dispatch, type SetStateAction } from 'react';

interface MenteeApplicationCardProps {
  application: MentorApplication;
}

export function MenteeApplicationCard({
  application,
}: MenteeApplicationCardProps) {
  const { data: mentorProfileData } = useGetMentorProfile(
    { mentorId: application.mentorId! },
    { query: { enabled: !!application.mentorId } },
  );

  const { data: getUserData } = useGetUser(
    { userId: application.mentorId! },
    { query: { enabled: !!application.mentorId } },
  );

  const [rateMentorModalIsOpen, setRateMentorModalIsOpen] = useState(false);

  const mentorUser = getUserData?.data?.user;
  const mentorProfile = mentorProfileData?.data?.profile;

  return (
    <>
      <ApplicationCard
        application={application}
        personDetail={
          <MentorSection
            mentorProfile={mentorProfile}
            mentorUser={mentorUser}
          />
        }
        showActionButtons={
          application.status === MentorApplicationStatus.ACCEPTED
        }
        actionButtons={
          <Space>
            <Button type="link" href={'mailto:' + mentorUser?.contact?.email}>
              Contact Mentor
            </Button>
            <Button
              data-testid={`rate-mentor-button-${mentorUser?.id}`}
              type="primary"
              onClick={() => {
                setRateMentorModalIsOpen(true);
              }}
            >
              Rate Mentor
            </Button>
          </Space>
        }
      />
      <RateMentorModal
        isOpen={rateMentorModalIsOpen}
        setIsOpen={setRateMentorModalIsOpen}
        mentorId={mentorUser?.id}
      />
    </>
  );
}

interface RateMentorModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mentorId: string | undefined;
}

function RateMentorModal({
  isOpen,
  setIsOpen,
  mentorId,
}: RateMentorModalProps) {
  const [form] = Form.useForm();

  const { currentUser } = useCurrentUser();

  const { mutateAsync: rateMentor } = useRateMentor();

  const handleOk = () => {
    form.validateFields().then((values) => {
      rateMentor({
        data: {
          menteeId: currentUser?.id,
          mentorId: mentorId,
          rating: values.rating,
          message: values.review,
        },
      }).then(() => {
        setIsOpen(false);
        form.resetFields();
      });
    });
  };

  return (
    <Modal
      title="Rate Mentor"
      open={isOpen}
      okText="Submit Rating"
      onOk={() => {
        handleOk();
      }}
      onCancel={() => {
        form.resetFields();
        setIsOpen(false);
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="rating"
          label="Rating"
          required={true}
          rules={[{ required: true, message: 'Please provide a rating!' }]}
        >
          <Input
            data-testid="rating-input"
            type="number"
            min={1}
            max={5}
            placeholder="Rate between 1 and 5"
          />
        </Form.Item>
        <Form.Item
          name="review"
          label="Review"
          required={true}
          rules={[{ required: true, message: 'Please provide a review!' }]}
        >
          <Input.TextArea
            data-testid="review-text-area"
            placeholder="Write your review here..."
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

interface MentorSectionProps {
  mentorProfile?: MentorProfile;
  mentorUser?: UserDto;
}

function MentorSection({ mentorProfile, mentorUser }: MentorSectionProps) {
  const fullName = `${mentorUser?.name?.title} ${mentorUser?.name?.firstName} ${mentorUser?.name?.lastName}`;

  const skillsNonEmpty =
    mentorProfile?.skills !== undefined && mentorProfile?.skills?.length >= 1;

  return (
    <Row style={{ width: '100%' }} gutter={[16, 16]}>
      <Col span={12}>
        <Space align="start" size="large">
          <Avatar size={64} icon={<UserOutlined />} />
          <Space direction="vertical" size="small">
            <Typography.Title level={4} style={{ margin: 0 }}>
              {fullName}
            </Typography.Title>
            {mentorProfile?.mentorCategory && (
              <MentorCategoryPill category={mentorProfile?.mentorCategory} />
            )}
          </Space>
        </Space>
      </Col>
      <Col span={12}>
        {skillsNonEmpty && (
          <MentorSkillsSection skills={mentorProfile?.skills!} />
        )}
      </Col>
    </Row>
  );
}
