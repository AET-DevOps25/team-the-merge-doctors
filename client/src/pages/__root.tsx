import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import { Button } from 'antd';

function RootComponent() {
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = `${window.location.origin}`;
  };

  return (
    <>
      <div className="p-2 flex gap-2">
        {isLoggedIn && (
          <>
            <Button onClick={handleLogout} style={{ marginLeft: 8 }}>
              Logout
            </Button>
            <Link to="/search" className="[&.active]:font-bold">
              Search
            </Link>
          </>
        )}
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  beforeLoad: () => {
    const publicRoutes = ['/login', '/signup'];
    if (
      !localStorage.getItem('token') &&
      !publicRoutes.includes(window.location.pathname)
    ) {
      window.location.href = '/login';
    }
  },
  component: RootComponent,
});
