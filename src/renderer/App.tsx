import {
  HashRouter as Router, // Changed to HashRouter for better Electron compatibility
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './Login';
import FormE from './Test';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');

  return token ? children : <Navigate to="/" />;
}

function AppRoutes() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/');
    } else {
      navigate('/form');
    }
  }, [navigate, token]);

  return (
    <Routes>
      {/* Login route */}
      <Route path="/" element={<Login />} />

      {/* Protected route */}
      <Route
        path="/form"
        element={
          <PrivateRoute>
            <FormE />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default function App() {
  return (
    <>
      {/* Router setup */}
      <Router>
        <AppRoutes />
      </Router>

      {/* Toast container for displaying notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}
