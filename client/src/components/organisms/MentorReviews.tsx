import { Card, Typography } from 'antd';
import { ReviewsList } from '@/components/molecules/ReviewsList';
import type { Rating } from '@/api/rating';

const { Title } = Typography;

interface MentorReviewsProps {
  ratings: Rating[];
}

export const MentorReviews = ({ ratings }: MentorReviewsProps) => {
  return (
    <Card>
      <Title level={4}>What Mentees Say ({ratings.length} Reviews)</Title>
      <ReviewsList ratings={ratings} />
    </Card>
  );
};
