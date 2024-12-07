/* eslint-disable no-console */
/* eslint-disable react/prop-types */
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import DashboardLayout from '../Components/layout/DashboardLayout';
import Form from '../Components/pages/form';
// import Prospects from '../Components/pages/Prospects';
// import ProxySetting from '../Components/pages/ProxySettings/ProxySetting';
// import Scrape from '../Components/pages/Scrape';
// import Api from '../Components/pages/Api';
// import Dm from '../Components/pages/dm/Dm';
import Login from '../Components/pages/auth/Login';
import { useEffect } from 'react';
// import SignUp from '../Components/pages/auth/SignUp';
// import Profile from '../Components/pages/profiles/Profile';
// import Messages from '../Components/pages/messages/Messages';

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token'); // Retrieve the token from localStorage
  const userRole = localStorage.getItem('role'); // Retrieve the user role from localStorage

  // Check if the token exists and the user role is admin
  if (!token || userRole !== 'admin') {
    return <Navigate to="/login" replace />; // Redirect to login if not authorized
  }

  return children; // Render the protected route
}
export default function Router() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  useEffect(() => {
    console.log('checktoken', token);
    if (!token) {
      navigate('/dashboard/login');
    } else {
      navigate('/dashboard/form');
    }
  }, [navigate, token]);
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: (
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      ),
      children: [
        // Protected dashboard routes
        // { path: 'form', element: <Form /> },
      ],
    },
    {
      // Public route for login
      path: '/dashboard/form',
      element: <Form />,
    },
    {
      // Public route for login
      path: '/dashboard/login',
      element: <Login />,
    },
  ]);

  return routes;
}
