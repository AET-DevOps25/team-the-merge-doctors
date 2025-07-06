import { useAuth } from '@/contexts/AuthContext';
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Button } from 'antd';

function RootComponent() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  return (
    <>
      <div className="p-2 flex gap-2">
        {isLoggedIn ? (
          <>
            <Button onClick={handleLogout} style={{ marginLeft: 8 }}>
              Logout
            </Button>
            <Link to="/search" className="[&.active]:font-bold">
              Search
            </Link>
          </>
        ) : (
          <Link to="/login" className="[&.active]:font-bold">
            Login
          </Link>
        )}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
