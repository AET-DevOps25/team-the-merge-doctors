import { useAuth } from '@/contexts/AuthContext';
import {
  createRootRoute,
  Link,
  Outlet,
  useNavigate,
} from '@tanstack/react-router';
import {
  FileTextOutlined,
  LogoutOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Menu } from 'antd';
import { useCurrentUser } from '@/utils/useCurrentUser';
import { UserDtoRole } from '@/api/user';
import type { MenuItemType } from 'antd/es/menu/interface';

function RootComponent() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const currentUser = useCurrentUser();

  const handleLogout = () => {
    logout();
    navigate({ to: '/' });
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'search':
        navigate({ to: '/search' });
        break;
      case 'applications':
        if (
          currentUser?.role === UserDtoRole.MENTOR &&
          currentUser?.id !== undefined
        ) {
          navigate({
            to: '/applications/mentor/$mentorId',
            params: { mentorId: currentUser?.id },
          });
        } else if (
          currentUser?.role === UserDtoRole.MENTEE &&
          currentUser?.id !== undefined
        ) {
          navigate({
            to: '/applications/mentee/$menteeId',
            params: { menteeId: currentUser?.id },
          });
        }
        break;
      case 'logout':
        handleLogout();
        break;
    }
  };

  let menuItems: MenuItemType[] = [];

  if (currentUser?.role === UserDtoRole.MENTEE) {
    menuItems = [
      {
        key: 'search',
        icon: <SearchOutlined />,
        label: 'Browse Mentors',
      },
    ];
  }

  menuItems = [
    ...menuItems,
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
    <>
      {isLoggedIn && (
        <Menu
          mode="horizontal"
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none bg-transparent"
        />
      )}
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
});
