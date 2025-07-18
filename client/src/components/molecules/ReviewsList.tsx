import { List } from 'antd';
import { ReviewItem } from '@/components/atoms/ReviewItem';
import type { Rating } from '@/api/rating';

interface ReviewsListProps {
  ratings: Rating[];
}

export const ReviewsList = ({ ratings }: ReviewsListProps) => {
  return (
    <List
      dataSource={ratings}
      locale={{ emptyText: 'No reviews' }}
      renderItem={(rating) => (
        <List.Item style={{ border: 'none', padding: 0 }}>
          <ReviewItem rating={rating} />
        </List.Item>
      )}
    />
  );
};
