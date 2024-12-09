import React, { useState } from 'react';
import icon from '../../assets/icon.svg';
import './App.css';

export default function Hello() {
  const [url, setUrl] = useState('');
  const [isBrowserOpen, setIsBrowserOpen] = useState(false);
  const openGoogleInChrome = async () => {
    if (!url) {
      alert('Please enter a URL');
      return;
    }

    setIsBrowserOpen(true);

    // Assuming you have a function `openGoogleInChrome` to open Chrome with Puppeteer
    window.electron.ipcRenderer.sendMessage('url-event', url);
  };

  const closeBrowser = () => {
    setIsBrowserOpen(false);
    // Add any additional cleanup code here if necessary
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <input
          type="text"
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="button" onClick={openGoogleInChrome}>
          Open
        </button>
        <button type="button" onClick={closeBrowser} disabled={!isBrowserOpen}>
          Close
        </button>
      </div>
    </div>
  );
}
