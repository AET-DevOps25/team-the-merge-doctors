import { SolutionOutlined, TrophyOutlined } from '@ant-design/icons';
import { Card, Col, Flex, Statistic } from 'antd';

interface MentorStatsProps {
  experience: string;
  category: string;
}

export const MentorStats = (props: MentorStatsProps) => {
  return (
    <Flex gap={18} justify="space-between">
      <Col span={12}>
        <Card style={{ textAlign: 'center', borderRadius: 12 }}>
          <Statistic
            title="Category"
            value={props.category}
            prefix={<SolutionOutlined />}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card style={{ textAlign: 'center', borderRadius: 12 }}>
          <Statistic
            title="Experience"
            value={`${props.experience}+ years`}
            prefix={<TrophyOutlined />}
          />
        </Card>
      </Col>
    </Flex>
  );
};
