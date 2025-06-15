import { Space } from 'antd';
import { useState } from 'react';
import { SkillSearchInput } from '../atoms/SkillSearchInput';
import { SkillSuggestionList } from '../molecules/SkillSuggestionList';
import { SelectedSkillsDisplay } from '../molecules/SelectedSkillsDisplay';

interface MentorSkillsProps {
  availableSkills: string[];
}

export const MentorSkills = (props: MentorSkillsProps) => {
  const [selectedSkills, setSelectedSkills] = useState([
    'Entrepreneurship',
    'Startup Strategy',
    'Business Validation',
  ]);
  const [searchValue, setSearchValue] = useState('');

  const filteredSkills = props.availableSkills.filter(
    (skill) =>
      skill.toLowerCase().includes(searchValue.toLowerCase()) &&
      !selectedSkills.includes(skill),
  );

  const handleSkillSelect = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
    setSearchValue('');
  };

  const handleSkillRemove = (skillToRemove: string) => {
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
