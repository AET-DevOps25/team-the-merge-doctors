import { useLocalStorage } from '@uidotdev/usehooks';
import { createContext, useContext, type ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  token: string | undefined;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useLocalStorage<string | undefined>('token');

  const login = (newToken: string) => {
    console.log('new token', newToken);
    setToken(newToken);
  };

  const logout = () => {
    setToken(undefined);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
