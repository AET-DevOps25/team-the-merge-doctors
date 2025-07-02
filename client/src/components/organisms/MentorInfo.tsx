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
  MessageOutlined,
  UserOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

interface MentorInfoProps {
  isAvailable: boolean;
  // avatar: string;
  name: string;
  // title: string;
  // company: string;
  location: string;
  // rating: number;
  // totalReviews: number;
}

export const MentorInfo: React.FC<MentorInfoProps> = (
  props: MentorInfoProps,
) => (
  <Card style={{ borderRadius: 16, marginBottom: 24 }}>
    <Row align="middle" gutter={24}>
      <Col>
        <Badge dot={props.isAvailable} color="green">
          {/* <Avatar size={120} src={props.avatar} /> */}
          <Avatar size={120} icon={<UserOutlined />} />
        </Badge>
      </Col>
      <Col flex={1}>
        <Space direction="vertical" size="small">
          <div>
            <Title level={2} style={{ margin: 0, marginBottom: 4 }}>
              {props.name}
              {props.isAvailable && (
                <Tag color="green" style={{ marginLeft: 12, borderRadius: 12 }}>
                  Available
                </Tag>
              )}
            </Title>
            {/* <Text style={{ fontSize: 18, color: '#666' }}>{props.title}</Text> */}
          </div>
          {/* <Text style={{ fontSize: 16, color: '#1890ff' }}>
            {props.company}
          </Text> */}
          <Space size="middle">
            <Space>
              <EnvironmentOutlined />
              <Text>{props.location}</Text>
            </Space>
            <Space>
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
            icon={<MessageOutlined />}
            style={{ borderRadius: 8 }}
          >
            Contact {props.name}
          </Button>
          {/* <Button icon={<HeartOutlined />} style={{ borderRadius: 8 }} block>
            Save
          </Button> */}
        </Space>
      </Col>
    </Row>
  </Card>
);
