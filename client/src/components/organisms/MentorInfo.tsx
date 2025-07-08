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
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import type { UserDto } from '@/api/user';
import { getLocation } from '@/utils/getLocation';
import { getFullName } from '@/utils/getFullName';

const { Title, Text } = Typography;

interface MentorInfoProps {
  isAvailable: boolean;
  user: UserDto | undefined;
  // rating: number;
  // totalReviews: number;
}

export const MentorInfo: React.FC<MentorInfoProps> = ({
  isAvailable,
  user,
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
              {getFullName(user?.name)}
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
              <Text>{getLocation(user?.address)}</Text>
            </Space>
            <Space>
              {/* TODO: show rating */}
              {/* <Rate disabled defaultValue={props.rating} /> */}
              {/* <Text>
                {props.rating} ({props.totalReviews} reviews)
              </Text> */}
            </Space>
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
