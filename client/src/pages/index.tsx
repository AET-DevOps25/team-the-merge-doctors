import { createFileRoute } from '@tanstack/react-router';
import { Button, notification } from 'antd';
import './index.css';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const [api, contextHolder] = notification.useNotification();

  const openNotification = () => {
    api.open({
      message: 'Welcome to MentorPulse',
      description:
        'MentorPulse is an application that connects mentors with mentees.',
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <h1>Welcome to MentorPulse</h1>
      <Button onClick={openNotification}> Click Me! </Button>
    </>
  );
}
