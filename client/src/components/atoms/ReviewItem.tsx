import { Avatar, Rate, Space, Typography } from 'antd';

const { Text } = Typography;

interface ReviewItemProps {
  name: string;
  rating: number;
  date: string;
  text: string;
  avatar: string;
}

export const ReviewItem = ({
  name,
  rating,
  date,
  text,
  avatar,
}: ReviewItemProps) => {
  return (
    <div style={{ marginBottom: 24 }}>
      <Space align="start" size={12}>
        <Avatar src={avatar} size={48} />
        <div>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Space size={8}>
              <Text strong style={{ fontSize: 16 }}>
                {name}
              </Text>
              <Rate disabled defaultValue={rating} style={{ fontSize: 14 }} />
              <Text type="secondary" style={{ fontSize: 14 }}>
                {date}
              </Text>
            </Space>
            <Text style={{ fontSize: 15, lineHeight: 1.6, color: '#595959' }}>
              {text}
            </Text>
          </Space>
        </div>
      </Space>
    </div>
  );
};
