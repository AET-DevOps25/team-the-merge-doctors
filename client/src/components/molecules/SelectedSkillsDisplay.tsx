import { Space, Typography } from 'antd';
import { SkillTag } from '../atoms/SkillTag';

const { Text } = Typography;

interface SelectedSkillsDisplayProps {
  skills: string[];
  onSkillRemove: (skill: string) => void;
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
          <SkillTag key={skill} skill={skill} onRemove={onSkillRemove} />
        ))}
      </Space>
    </div>
  );
};
