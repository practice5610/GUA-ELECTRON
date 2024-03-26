/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Components/Sidebar';
import Router from './routes';

export default function App() {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState('proxy_setting');
  const token = localStorage.getItem('token');
  console.log(token);
  const handleItemClick = (path) => {
    setSelectedComponent(path);
  };

  useEffect(() => {
    if (!token) {
      navigate('/dashboard/login');
    } else {
      navigate('/dashboard/proxy_settings');
    }
  }, [token]);

  return (
    <div>
      <div className="row g-0">
        <div className="col-2">
          <Sidebar
            selectedComponent={selectedComponent}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="col-10">
          <Router />{' '}
        </div>
      </div>
    </div>
  );
}
