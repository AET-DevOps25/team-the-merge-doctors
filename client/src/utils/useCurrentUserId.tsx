import { useAuth } from '@/contexts/AuthContext';
import { jwtDecode } from 'jwt-decode';

export function useCurrentUserId() {
  const { token } = useAuth();
  const userId = getUserIdFromToken(token);

  return userId;
}

const getUserIdFromToken = (token: string | undefined): string | undefined => {
  if (token === undefined) return undefined;
  const decoded = jwtDecode<{
    sub: string;
    userId: string;
    role: string;
    exp: number;
  }>(token);
  return decoded.userId;
};
