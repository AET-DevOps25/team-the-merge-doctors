import type { Skill } from '@/api/mentor';
import { Tag } from 'antd';

interface SkillPillProps {
  skill: Skill;
}

export function SkillPill({ skill }: SkillPillProps) {
  return <Tag>{skill.name}</Tag>;
}
