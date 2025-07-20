import React, { useState, type Dispatch, type SetStateAction } from 'react';
import {
  Avatar,
  Badge,
  Card,
  Col,
  Row,
  Space,
  Typography,
  Tag,
  Button,
  Modal,
  Form,
  message,
} from 'antd';
import {
  EnvironmentOutlined,
  StarFilled,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { UserDto } from '@/api/user';
import { getLocation } from '@/utils/getLocation';
import { getFullName } from '@/utils/getFullName';
import type { Rating } from '@/api/rating';
import { useForm } from 'antd/es/form/Form';
import TextArea from 'antd/es/input/TextArea';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { useCreateApplication } from '@/api/mentor';

const { Title, Text } = Typography;

interface MentorInfoProps {
  isAvailable: boolean;
  mentorUser: UserDto | undefined;
  ratings: Rating[];
  averageRating: string | undefined;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({
  isAvailable,
  mentorUser,
  ratings,
  averageRating,
}: MentorInfoProps) => {
  const [applicationModalIsOpen, setApplicationModalIsOpen] = useState(false);

  return (
    <>
      <Card style={{ borderRadius: 16 }}>
        <Row align="middle" gutter={24}>
          <Col>
            <Badge dot={isAvailable} color="green">
              <Avatar size={120} icon={<UserOutlined />} />
            </Badge>
          </Col>
          <Col flex={1}>
            <Space direction="vertical" size="small">
              <div>
                <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
                  {getFullName(mentorUser?.name)}
                  {isAvailable && (
                    <Tag
                      color="green"
                      style={{ marginLeft: 12, borderRadius: 12 }}
                    >
                      Available
                    </Tag>
                  )}
                </Title>
              </div>
              <Space size="middle">
                <Space>
                  <EnvironmentOutlined />
                  <Text>{getLocation(mentorUser?.address)}</Text>
                </Space>
                <Text>
                  <div style={{ fontWeight: 'bold', marginLeft: 'auto' }}>
                    {ratings.length === 0 ? undefined : (
                      <div style={{ color: '#FFD700' }}>
                        {averageRating} <StarFilled /> ({ratings.length}{' '}
                        reviews)
                      </div>
                    )}
                  </div>
                </Text>
              </Space>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" size="small">
              <Button
                type="primary"
                size="large"
                icon={<TeamOutlined />}
                onClick={() => {
                  setApplicationModalIsOpen(true);
                }}
                style={{ borderRadius: 8 }}
                data-testid="mentorship-application-button"
              >
                Apply for mentorship
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <CreateApplicationModal
        isOpen={applicationModalIsOpen}
        setIsOpen={setApplicationModalIsOpen}
        mentorId={mentorUser?.id}
      />
    </>
  );
};

interface CreateApplicationModalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mentorId: string | undefined;
}

function CreateApplicationModal({
  isOpen,
  setIsOpen,
  mentorId,
}: CreateApplicationModalProps) {
  const [form] = useForm();
  const [messageApi, contextHolder] = message.useMessage();

  const { currentUser } = useCurrentUser();

  const { mutateAsync: createApplication } = useCreateApplication();

  function handleApplicationSubmit() {
    form.validateFields().then((values) => {
      const loadingMessageKey = 'application-loading';
      messageApi.open({
        key: loadingMessageKey,
        type: 'loading',
        content: 'Submitting application',
        duration: 0,
      });

      setIsOpen(false);

      createApplication({
        data: {
          menteeId: currentUser?.id,
          mentorId: mentorId,
          applicationMessage: values.applicationMessage,
        },
      }).then((response) => {
        if (response?.data) {
          messageApi.open({
            key: loadingMessageKey,
            type: 'success',
            content: 'Application created',
          });
        } else {
          messageApi.open({
            key: loadingMessageKey,
            type: 'error',
            content: 'Failed to create application',
          });
        }
      });
    });
  }

  return (
    <>
      {contextHolder}
      <Modal
        title="Apply for Mentorship"
        okText="Submit Application"
        open={isOpen}
        onOk={handleApplicationSubmit}
        onCancel={() => {
          setIsOpen(false);
          form.resetFields();
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="applicationMessage"
            label="Message"
            required={true}
            rules={[
              {
                required: true,
                message: 'Please provide an application text!',
              },
            ]}
          >
            <TextArea
              data-testid="application-modal-text-area"
              rows={15}
              placeholder="Write your application to the mentor ..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
