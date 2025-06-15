import {
  GlobalOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Flex, Statistic } from 'antd';

interface MentorStatsProps {
  totalMentees: number;
  experience: string;
  languages: string[];
}

export const MentorStats = (props: MentorStatsProps) => {
  return (
    <Flex gap={18} justify="space-between" style={{ padding: '1rem' }}>
      <Col span={6}>
        <Card style={{ textAlign: 'center', borderRadius: 12 }}>
          <Statistic
            title="Mentees"
            value={props.totalMentees}
            prefix={<UserOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: 'center', borderRadius: 12 }}>
          <Statistic
            title="Experience"
            value={props.experience}
            prefix={<TrophyOutlined />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card style={{ textAlign: 'center', borderRadius: 12 }}>
          <Statistic
            title="Languages"
            value={props.languages.length}
            prefix={<GlobalOutlined />}
          />
        </Card>
      </Col>
    </Flex>
  );
};
