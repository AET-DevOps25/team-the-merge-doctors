import { List } from 'antd';
import { ReviewItem } from '@/components/atoms/ReviewItem';
import type { Review } from '@/types/review';

interface ReviewsListProps {
  reviews: Review[];
}

export const ReviewsList = ({ reviews }: ReviewsListProps) => {
  return (
    <List
      dataSource={reviews}
      renderItem={(review) => (
        <List.Item style={{ border: 'none', padding: 0 }}>
          <ReviewItem
            name={review.name}
            rating={review.rating}
            date={review.date}
            text={review.text}
            avatar={review.avatar}
          />
        </List.Item>
      )}
    />
  );
};
