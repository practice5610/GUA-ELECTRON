/* eslint-disable no-console */
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import ProxySetting from '../Components/pages/ProxySettings/ProxySetting';
import Scrape from '../Components/pages/Scrape';
import Api from '../Components/pages/Api';
import Prospects from '../Components/pages/Prospects';
import Dm from '../Components/pages/dm/Dm';

export default function App() {
  const [selectedComponent, setSelectedComponent] = useState('proxy_setting');

  const handleItemClick = (path) => {
    setSelectedComponent(path);
  };

  return (
    <div>
      {' '}
      <div className="row g-0">
        <div className="col-2">
          <Sidebar
            selectedComponent={selectedComponent}
            onItemClick={handleItemClick}
          />
        </div>
        <div className="col-10">
          {selectedComponent === 'proxy_setting' && <ProxySetting />}
          {selectedComponent === 'scrape' && <Scrape />}
          {selectedComponent === 'api' && <Api />}
          {selectedComponent === 'prospects' && <Prospects />}
          {selectedComponent === 'dm' && <Dm />}
        </div>
      </div>
    </div>
  );
}
