import { createFileRoute } from '@tanstack/react-router';
import { Card, Col, Row } from 'antd';
import { MentorCard } from '../../components/organisms/MentorCard';

export const Route = createFileRoute('/search/')({
  component: Search,
});

type Mentor = {
  id: string;
};

export function Search() {
  return (
    <MentorCard />
    // <Row>
    //   <Col span={8}></Col>
    //   <Col span={16}>
    //     <MentorCard />
    //   </Col>
    // </Row>
  );
}
