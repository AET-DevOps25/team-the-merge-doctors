import type { Rating } from '@/api/rating';
import { useGetUser } from '@/api/user';
import { Avatar, Rate, Space, Typography } from 'antd';

const { Text } = Typography;

interface ReviewItemProps {
  rating: Rating;
}

export const ReviewItem = ({ rating }: ReviewItemProps) => {
  const { data: getUserData } = useGetUser(
    { userId: rating?.menteeId! },
    {
      query: { enabled: !!rating?.menteeId },
    },
  );

  const reviewer = getUserData?.data.user;

  return (
    <div style={{ marginBottom: 24 }}>
      <Space align="start" size={12}>
        <Avatar size={48} />
        <div>
          <Space direction="vertical" size={4} style={{ width: '100%' }}>
            <Space size={8}>
              <Text strong style={{ fontSize: 16 }}>
                {reviewer?.name?.firstName}
              </Text>
              <Rate
                disabled
                defaultValue={rating.rating}
                style={{ fontSize: 14 }}
              />
            </Space>
            <Text style={{ fontSize: 15, lineHeight: 1.6, color: '#595959' }}>
              {rating?.message}
            </Text>
          </Space>
        </div>
      </Space>
    </div>
  );
};
