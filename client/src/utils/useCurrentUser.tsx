import { useGetUser } from '@/api/user';
import { useCurrentUserId } from '@/utils/useCurrentUserId';

export function useCurrentUser() {
  const userId = useCurrentUserId();

  if (!userId) {
    return undefined;
  }

  const { data: getUserData } = useGetUser({ userId: userId });

  return getUserData?.data.user;
}
