import type { Skill } from '@/api/mentor';
import { SkillPill } from '@/components/atoms/SkillPill';

interface MentorSkillsSectionProps {
  skills?: Skill[];
}

export function MentorSkillsSection({ skills }: MentorSkillsSectionProps) {
  return (
    <div>
      <div style={{ fontWeight: 'bold' }}>Skills</div>
      {skills?.map((skill) => <SkillPill key={skill?.id} skill={skill} />)}
    </div>
  );
}
