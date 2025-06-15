import type { Category, Skill } from '@/types/types';
import { Checkbox, Input, Space } from 'antd';
import { useState } from 'react';

interface SearchCategoryProps {}

export function SearchCategory({}: SearchCategoryProps) {
  const categories: Category[] = [
    { id: '1', name: 'Engineer' },
    { id: '2', name: 'Founder' },
    { id: '3', name: 'Testing Person' },
    { id: '4', name: 'Marketing Genius' },
    { id: '5', name: 'Marketing Magician' },
  ];

  const [filterInput, setFilterInput] = useState<string>('');
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);

  const filteredCategories = filterCategories(
    categories,
    filterInput,
    selectedCategories,
  );

  return (
    <Space direction="vertical">
      <div style={{ fontWeight: 'bold' }}>Category</div>
      <Input
        placeholder="Search for categories"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      {filteredCategories.map((skill) => (
        <Checkbox
          key={skill.id}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedCategories([...selectedCategories, skill]);
            } else {
              setSelectedCategories(
                selectedCategories.filter(
                  (selectedSkill) => selectedSkill.id !== skill.id,
                ),
              );
            }
          }}
        >
          {skill.name}
        </Checkbox>
      ))}
    </Space>
  );
}

function filterCategories(
  skills: Skill[],
  input: string,
  selectedSkills: Skill[],
): Skill[] {
  return skills.filter(
    (skill) =>
      skill.name.toLowerCase().includes(input.toLowerCase()) ||
      selectedSkills.some((selectedSkill) => selectedSkill.id == skill.id),
  );
}
