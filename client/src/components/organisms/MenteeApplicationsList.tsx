import type { MentorApplication } from '@/api/mentor';
import { MenteeApplicationCard } from '@/components/organisms/MenteeApplicationCard';

interface MenteeApplicationsListProps {
  applications: MentorApplication[];
}

export function MenteeApplicationsList({
  applications,
}: MenteeApplicationsListProps) {

  // TODO: maybe change to antdesign list
  return (
    <>
      {applications.map((application) => (
        <MenteeApplicationCard key={application.id} application={application} />
      ))}
    </>
  );
}
