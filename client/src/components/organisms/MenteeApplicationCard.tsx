import type { MentorApplication } from '@/api/mentor';
import { Card } from 'antd';

interface MenteeApplicationCardProps {
  application: MentorApplication;
}

export function MenteeApplicationCard({
  application,
}: MenteeApplicationCardProps) {
  return <Card>Application Card</Card>;
}
