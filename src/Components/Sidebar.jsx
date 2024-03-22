/* eslint-disable no-console */
/* eslint-disable react/button-has-type */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

const sidebar = [
  {
    id: 1,
    title: 'Proxy Settings',
    path: 'proxy_setting',
  },
  {
    id: 2,
    title: 'Scrape',
    path: 'scrape',
  },
  {
    id: 3,
    title: 'API',
    path: 'api',
  },
  {
    id: 4,
    title: 'Prospects',
    path: 'prospects',
  },
  {
    id: 5,
    title: 'DM',
    path: 'dm',
  },
];
function Sidebar({ onItemClick, selectedComponent }) {
  return (
    <div className="sidebar">
      <div className="py-2">
        <span className="brand-name fs-4 pl-2">GUA</span>
      </div>

      {sidebar.map((item, index) => (
        <div key={index} className="btn-container">
          <button
            onClick={() => onItemClick(item?.path)}
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
  onItemClick: PropTypes.func,
  selectedComponent: PropTypes.string,
};
