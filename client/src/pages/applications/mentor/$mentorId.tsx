import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute('/applications/mentor/$mentorId')({
    component: MenteeViewApplicationsPage,
});

export function MenteeViewApplicationsPage() {
    return <>Mentor manage applications page</>
}