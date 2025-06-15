import { SkillSuggestionItem } from '../atoms/SkillSuggestionItem';

interface SkillSuggestionListProps {
  skills: string[];
  onSkillSelect: (skill: string) => void;
  maxItems?: number;
}

export const SkillSuggestionList = ({
  skills,
  onSkillSelect,
}: SkillSuggestionListProps) => {
  if (skills.length === 0) return null;

  return (
    <div
      style={{
        border: '1px solid #d9d9d9',
        borderRadius: 8,
        backgroundColor: 'white',
        maxHeight: 150,
        overflowY: 'auto',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      {skills?.map((skill) => (
        <SkillSuggestionItem
          key={skill}
          skill={skill}
          onSelect={onSkillSelect}
        />
      ))}
    </div>
  );
};
