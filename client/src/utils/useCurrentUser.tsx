import { useGetUser } from '@/api/user';
import { useCurrentUserId } from '@/utils/useCurrentUserId';

export function useCurrentUser() {
  const userId = useCurrentUserId();

  const { data: getUserData, isLoading } = useGetUser(
    { userId: userId! },
    {
      query: {
        enabled: !!userId,
      },
    },
  );

  if (!userId) {
    return { currentUser: undefined, isLoading: false };
  }

  return { currentUser: getUserData?.data.user, isLoading: isLoading };
}
