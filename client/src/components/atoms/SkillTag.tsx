import { Tag } from 'antd';

interface SkillTagProps {
  skill: string;
  onRemove: (skill: string) => void;
  closable?: boolean;
}

export const SkillTag = ({
  skill,
  onRemove,
  closable = true,
}: SkillTagProps) => {
  return (
    <Tag
      closable={closable}
      onClose={() => onRemove(skill)}
      style={{
        padding: '4px 8px',
        borderRadius: 16,
        backgroundColor: '#e6f7ff',
        borderColor: '#91d5ff',
        color: '#1890ff',
        fontSize: 13,
      }}
    >
      {skill}
    </Tag>
  );
};
