import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Login from './Login';
import FormE from './Test';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
  console.log('cehcktoken', token);
  return token ? children : <Navigate to="/" />;
}

export default function App() {
  return (
    <>
      {/* Router setup */}
      <Router>
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
