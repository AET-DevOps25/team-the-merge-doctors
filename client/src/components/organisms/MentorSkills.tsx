import { Space } from 'antd';
import { useEffect, useState } from 'react';
import { SkillSearchInput } from '../atoms/SkillSearchInput';
import { SkillSuggestionList } from '../molecules/SkillSuggestionList';
import { SelectedSkillsDisplay } from '../molecules/SelectedSkillsDisplay';
import type { Skill } from '@/api/mentor';

interface MentorSkillsProps {
  availableSkills: Skill[];
  initialSkills: Skill[];
}

export const MentorSkills = (props: MentorSkillsProps) => {
  const [selectedSkills, setSelectedSkills] = useState(props.initialSkills);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    setSelectedSkills(props.initialSkills);
  }, [props.initialSkills]);

  const filteredSkills = props.availableSkills.filter(
    (skill) =>
      skill.name?.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedSkills.some((s) => s.id === skill.id),
  );

  const handleSkillSelect = (skill: Skill) => {
    if (!selectedSkills.some((s) => s.id === skill.id)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearchValue('');
  };

  const handleSkillRemove = (skillToRemove: Skill) => {
    setSelectedSkills(
      selectedSkills.filter((skill) => skill !== skillToRemove),
    );
  };

  return (
    <Space direction="vertical" size={16} style={{ width: '100%' }}>
      <SkillSearchInput
        value={searchValue}
        onChange={setSearchValue}
        placeholder="Search and add skills..."
      />

      {searchValue && (
        <SkillSuggestionList
          skills={filteredSkills}
          onSkillSelect={handleSkillSelect}
        />
      )}
      <SelectedSkillsDisplay
        skills={selectedSkills}
        onSkillRemove={handleSkillRemove}
      />
    </Space>
  );
};

export default MentorSkills;
