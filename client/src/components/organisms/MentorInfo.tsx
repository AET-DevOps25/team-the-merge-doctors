import React from 'react';
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
}: MentorInfoProps) => (
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
                <Tag color="green" style={{ marginLeft: 12, borderRadius: 12 }}>
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
                    {averageRating} <StarFilled /> ({ratings.length} reviews)
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
            style={{ borderRadius: 8 }}
          >
            Apply for mentorship
          </Button>
        </Space>
      </Col>
    </Row>
  </Card>
);
