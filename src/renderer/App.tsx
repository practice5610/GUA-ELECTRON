import {
  MemoryRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Hello from './Test';
import Login from './Login';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('token');
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
            path="/test"
            element={
              <PrivateRoute>
                <Hello />
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
