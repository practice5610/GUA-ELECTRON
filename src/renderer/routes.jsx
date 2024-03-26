import { useRoutes } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import Prospects from '../Components/pages/Prospects';
import ProxySetting from '../Components/pages/ProxySettings/ProxySetting';
import Scrape from '../Components/pages/Scrape';
import Api from '../Components/pages/Api';
import Dm from '../Components/pages/dm/Dm';
import Login from '../Components/pages/auth/Login';
import SignUp from '../Components/pages/auth/SignUp';
import Profile from '../Components/pages/profiles/Profile';

export default function Router() {
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'proxy_setting', element: <ProxySetting /> },
        { path: 'scrape', element: <Scrape /> },
        { path: 'api', element: <Api /> },
        { path: 'prospects', element: <Prospects /> },
        { path: 'dm', element: <Dm /> },
        { path: 'profile', element: <Profile /> },
        { path: 'login', element: <Login /> },
        { path: 'signup', element: <SignUp /> },
      ],
    },
  ]);

  return routes;
}
