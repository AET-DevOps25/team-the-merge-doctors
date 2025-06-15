import type { Skill } from '@/types/types';
import { Checkbox, Input, Space } from 'antd';
import { useState } from 'react';

interface SearchSkillsProps {}

export function SearchSkills({}: SearchSkillsProps) {
  const skills: Skill[] = [
    { id: '1', name: 'Testing' },
    { id: '2', name: 'Swift' },
    { id: '3', name: 'Java' },
    { id: '4', name: 'C++' },
    { id: '5', name: 'C' },
  ];

  const [filterInput, setFilterInput] = useState<string>('');
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);

  const filteredSkills = filterSkills(skills, filterInput, selectedSkills);

  return (
    <Space direction="vertical">
      <div style={{ fontWeight: 'bold' }}>Skills</div>
      <Input
        placeholder="Search for skills"
        value={filterInput}
        onChange={(e) => setFilterInput(e.target.value)}
      />
      {filteredSkills.map((skill) => (
        <Checkbox
          key={skill.id}
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedSkills([...selectedSkills, skill]);
            } else {
              setSelectedSkills(
                selectedSkills.filter(
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

function filterSkills(
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
