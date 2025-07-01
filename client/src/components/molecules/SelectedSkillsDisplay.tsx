import { Space, Typography } from 'antd';
import { SkillTag } from '../atoms/SkillTag';
import type { Skill } from '@/api/mentor';

const { Text } = Typography;

interface SelectedSkillsDisplayProps {
  skills: Skill[];
  onSkillRemove: (skill: Skill) => void;
  title?: string;
}

export const SelectedSkillsDisplay = ({
  skills,
  onSkillRemove,
  title = 'Selected Skills',
}: SelectedSkillsDisplayProps) => {
  return (
    <div>
      <Text
        style={{
          color: '#666',
          fontSize: 13,
          marginBottom: 8,
          display: 'block',
        }}
      >
        {title} ({skills.length})
      </Text>
      <Space size="small" wrap>
        {skills.map((skill) => (
          <SkillTag key={skill.id} skill={skill} onRemove={onSkillRemove} />
        ))}
      </Space>
    </div>
  );
};
