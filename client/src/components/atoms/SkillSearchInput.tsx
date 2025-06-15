import { Input } from 'antd';

interface SkillSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SkillSearchInput = ({
  value,
  onChange,
  placeholder = 'Search and add skills...',
}: SkillSearchInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        borderRadius: 8,
        padding: '8px 12px',
        fontSize: 14,
      }}
    />
  );
};
