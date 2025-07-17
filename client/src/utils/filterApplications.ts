import {
  type MentorApplication,
  MentorApplicationStatus,
} from '@/api/mentor.ts';

export function getPendingApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.PENDING,
  );
}

export function getAcceptedApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.ACCEPTED,
  );
}

export function getRejectedApplications(
  applications: MentorApplication[],
): MentorApplication[] {
  return applications.filter(
    (application) => application.status === MentorApplicationStatus.REJECTED,
  );
}
