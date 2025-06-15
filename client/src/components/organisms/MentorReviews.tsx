import { Card, Typography } from 'antd';
import { ReviewsList } from '@/components/molecules/ReviewsList';
import type { Review } from '@/types/review';

const { Title } = Typography;

interface MentorReviewsProps {
  reviews: Review[];
}

export const MentorReviews = ({ reviews }: MentorReviewsProps) => {
  return (
    <Card>
      <Title level={4}>What Mentees Say ({reviews.length} Reviews)</Title>
      <ReviewsList reviews={reviews} />
    </Card>
  );
};
