import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';
import Hello from './Test';
import Login from './Login';

export default function App() {
  return (
    <>
      {/* Router setup */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
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
