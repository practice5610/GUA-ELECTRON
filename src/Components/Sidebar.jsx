/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const sidebar = [
  {
    id: 1,
    title: 'Proxy Settings',
    path: '/dashboard/proxy_setting',
  },
  {
    id: 2,
    title: 'Scrape',
    path: '/dashboard/scrape',
  },
  {
    id: 3,
    title: 'API',
    path: '/dashboard/api',
  },
  {
    id: 4,
    title: 'Prospects',
    path: '/dashboard/prospects',
  },
  {
    id: 5,
    title: 'DM',
    path: '/dashboard/dm',
  },
  {
    id: 6,
    title: 'Profile',
    path: '/dashboard/profile',
  },
  {
    id: 7,
    title: 'Messages',
    path: '/dashboard/messages',
  },
  {
    id: 8,
    title: 'LogIn',
    path: '/dashboard/login',
  },
  {
    id: 9,
    title: 'SignUp',
    path: '/dashboard/signup',
  },
];
function Sidebar({ selectedComponent }) {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="py-2">
        <span className="brand-name fs-4 pl-2">GUA</span>
      </div>

      {sidebar.map((item, index) => (
        <div key={index} className="btn-container">
          <button
            onClick={() => navigate(item?.path)}
            className={`btn list-group-item py-2 ${
              selectedComponent === item.path ? 'active' : ''
            }`}
          >
            <span>{item?.title}</span>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
Sidebar.propTypes = {
  // onItemClick: PropTypes.func,
  selectedComponent: PropTypes.string,
};
