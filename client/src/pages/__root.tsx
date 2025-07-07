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

function RootComponent() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

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
                // TODO: use id of currently logged in user. Depending on role either navigate to mentee or mentor.
                navigate({
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
            <>
            {isLoggedIn ? <Menu
                    mode="horizontal"
                    items={menuItems}
                    onClick={handleMenuClick}
                    className="border-none bg-transparent"
                /> : <Link to="/login" className="[&.active]:font-bold">
                    Login
                </Link>}
             <hr />
            <Outlet />
            <TanStackRouterDevtools />
            </>
        );
}

export const Route = createRootRoute({
  component: RootComponent,
});
