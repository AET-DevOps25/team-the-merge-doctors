import type { MentorCategory } from '@/api/mentor';
import { Divider, Tag } from 'antd';

interface MentorCategoryPillProps {
  category: MentorCategory;
}

export function MentorCategoryPill({ category }: MentorCategoryPillProps) {
  return (
    <Tag>
      {category.category?.name}
      <Divider type="vertical" size="large" />
      {category.yearsOfExperience}+ years
    </Tag>
  );
}
