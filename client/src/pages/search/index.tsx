import { createFileRoute } from '@tanstack/react-router';
import { Card, Col, Layout, Row } from 'antd';
import { MentorCard } from '../../components/organisms/mentor-search/MentorCard';
import { SearchSkills } from '@/components/molecules/SearchSkills';
import { SearchFilterSidebar } from '@/components/organisms/mentor-search/SearchFilterSidebar';
import { SearchMentorList } from '@/components/organisms/mentor-search/SearchMentorList';

export const Route = createFileRoute('/search/')({
  component: Search,
});

export function Search() {
  return (
    <Layout style={{ minHeight: '100vh', padding: 24, background: '#fff' }}>
      <Row gutter={24}>
        <Col xs={24} sm={6} md={6} lg={5}>
          <SearchFilterSidebar />
        </Col>
        <Col xs={24} sm={18} md={18} lg={19}>
          <SearchMentorList />
        </Col>
      </Row>
    </Layout>
  );
}
