import { createFileRoute } from '@tanstack/react-router';
import { Col, Divider, Layout, Row, Space, Spin } from 'antd';
import { SearchFilter } from '@/components/molecules/SearchFilter';
import {
  type ComparisonFilter,
  useListCategories,
  useListMentorProfiles,
  useListSkills,
  type Category,
  type Skill,
} from '@/api/mentor';
import { useEffect, useState } from 'react';
import { MentorCard } from '@/components/organisms/mentor-search/MentorCard';
import { YearsOfExperienceFilter } from '@/components/molecules/YearsOfExperienceFilter';

export const Route = createFileRoute('/search/')({
  component: Search,
});

export function Search() {
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const [selectedExperienceFilter, setSelectedExperienceFilter] =
    useState<ComparisonFilter>();

  const { data: listSkillsData, isLoading: skillsIsLoading } = useListSkills();

  const { data: listCategoriesData, isLoading: categoriesIsLoading } =
    useListCategories();

  const {
    mutate: listMentorProfiles,
    data: listMentorsData,
    isPending: listProfilesIsPending,
  } = useListMentorProfiles();

  useEffect(() => {
    listMentorProfiles({
      data: {
        categoryIds: selectedCategories
          .map((category) => category.id)
          .filter((id) => id !== undefined && id !== null),
        skillIds: selectedSkills
          .map((skill) => skill.id)
          .filter((id) => id !== undefined && id !== null),
        yearsOfExperienceFilter: selectedExperienceFilter,
      },
    });
  }, [
    listMentorProfiles,
    selectedCategories,
    selectedSkills,
    selectedExperienceFilter,
  ]);

  return (
    <Layout style={{ height: '100vh', padding: 24, overflow: 'hidden' }}>
      <Row gutter={24} style={{ height: '100%', overflow: 'hidden' }}>
        <Col
          xs={24}
          sm={6}
          md={6}
          lg={5}
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingRight: 16,
          }}
        >
          {skillsIsLoading || categoriesIsLoading ? (
            <Spin />
          ) : (
            <>
              <SearchFilter
                placeholder="Search for categories"
                selectedItems={selectedCategories}
                setSelectedItems={setSelectedCategories}
                items={listCategoriesData?.data.categories ?? []}
                title="Categories"
              />
              <Divider />
              <SearchFilter
                placeholder="Search for skills"
                selectedItems={selectedSkills}
                setSelectedItems={setSelectedSkills}
                items={listSkillsData?.data.skills ?? []}
                title="Skills"
              />
              <Divider />
              <YearsOfExperienceFilter
                selectedExperienceFilter={selectedExperienceFilter}
                setSelectedExperienceFilter={setSelectedExperienceFilter}
              />
              <div style={{ height: 50 }} />
            </>
          )}
        </Col>
        <Col
          xs={24}
          sm={18}
          md={18}
          lg={19}
          style={{
            height: '100%',
            overflowY: 'auto',
            paddingLeft: 16,
          }}
        >
          {listProfilesIsPending ? (
            <Spin />
          ) : (
            <Space size="large" direction="vertical">
              {listMentorsData?.data?.mentorProfile?.map((mentor) => (
                <MentorCard key={mentor.id} mentor={mentor} />
              ))}
            </Space>
          )}
          <div style={{ height: 50 }} />
        </Col>
      </Row>
    </Layout>
  );
}
