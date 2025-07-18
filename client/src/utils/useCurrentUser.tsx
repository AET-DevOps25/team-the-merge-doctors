import { useGetUser } from '@/api/user';
import { useCurrentUserId } from '@/utils/useCurrentUserId';

export function useCurrentUser() {
  const userId = useCurrentUserId();

  if (!userId) {
    return { currentUser: undefined, isLoading: false };
  }

  const { data: getUserData, isLoading } = useGetUser({ userId: userId });

  return { currentUser: getUserData?.data.user, isLoading: isLoading };
}
