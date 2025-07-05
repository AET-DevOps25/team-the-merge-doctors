import {
  FileTextOutlined,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { createRootRoute, Outlet, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Menu } from 'antd';

export const Route = createRootRoute({
  component: () => (
    <>
      <TopNavigation />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

// TODO: do not show topnavigation when logged out. Do not show when on mentor profile page (https://github.com/TanStack/router/discussions/1227)
function TopNavigation() {
  const router = useRouter();

  const handleLogout = () => {
    // TODO: handle logout
    console.log('Logout clicked');
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'search':
        router.navigate({ to: '/search' });
        break;
      case 'applications':
        // TODO: use id of currently logged in user. Depending on role either navigate to mentee or mentor.
        router.navigate({
          to: '/applications/mentor/$mentorId',
          params: { mentorId: '123' },
        });
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  const menuItems = [
    // TODO: do not show search for mentors?
    {
      key: 'search',
      icon: <SearchOutlined />,
      label: 'Browse Mentors',
    },
    {
      key: 'applications',
      icon: <FileTextOutlined />,
      label: 'Applications',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
    },
  ];

  return (
    <Menu
      mode="horizontal"
      items={menuItems}
      onClick={handleMenuClick}
      className="border-none bg-transparent"
    />
  );
}
