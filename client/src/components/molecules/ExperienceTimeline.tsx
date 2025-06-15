import { Timeline } from 'antd';
import { ExperienceItem } from '../atoms/ExperienceItem';

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface ExperienceTimelineProps {
  experiences: Experience[];
}

export const ExperienceTimeline = ({
  experiences,
}: ExperienceTimelineProps) => {
  return (
    <Timeline>
      {experiences.map((exp, index) => (
        <Timeline.Item key={index}>
          <ExperienceItem
            title={exp.title}
            company={exp.company}
            period={exp.period}
            description={exp.description}
          />
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
