import type { Skill } from '@/api/mentor';
import { PlusOutlined } from '@ant-design/icons';

interface SkillSuggestionItemProps {
  skill: Skill;
  onSelect: (skill: Skill) => void;
}

export const SkillSuggestionItem = ({
  skill,
  onSelect,
}: SkillSuggestionItemProps) => {
  return (
    <div
      style={{
        padding: '8px 12px',
        cursor: 'pointer',
        borderBottom: '1px solid #f0f0f0',
      }}
      onMouseEnter={(e) => {
        const target = e.target as HTMLElement;
        target.style.backgroundColor = '#f5f5f5';
      }}
      onMouseLeave={(e) => {
        const target = e.target as HTMLElement;
        target.style.backgroundColor = 'white';
      }}
      onClick={() => onSelect(skill)}
    >
      <PlusOutlined style={{ marginRight: 8, color: '#1890ff' }} />
      {skill?.name}
    </div>
  );
};
