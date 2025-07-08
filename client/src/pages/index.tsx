import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';
import { Spin } from 'antd';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { UserDtoRole } from '@/api/user';

export const Route = createFileRoute('/')({
  component: Index,
});

function Index() {
  const { isLoggedIn } = useAuth();
  const { currentUser, isLoading } = useCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isLoggedIn && currentUser?.role === UserDtoRole.MENTEE) {
      navigate({ to: '/search' });
    } else if (
      isLoggedIn &&
      currentUser?.role === UserDtoRole.MENTOR &&
      currentUser.id
    ) {
      navigate({
        to: '/applications/mentor/$mentorId',
        params: { mentorId: currentUser.id },
      });
    } else {
      navigate({ to: '/login' });
    }
  }, [isLoggedIn, currentUser, isLoading, navigate]);

  return <Spin />;
}
