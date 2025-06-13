import { Space, Typography } from 'antd';

const { Text } = Typography;

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
}

export const ExperienceItem = ({
  title,
  company,
  period,
  description,
}: ExperienceItemProps) => {
  return (
    <Space direction="vertical" size="small">
      <Text strong style={{ fontSize: 16 }}>
        {title}
      </Text>
      <Text style={{ color: '#1890ff' }}>
        {company} / {period}
      </Text>
      <Text style={{ color: '#666' }}>{description}</Text>
    </Space>
  );
};
