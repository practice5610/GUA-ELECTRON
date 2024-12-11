import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Request user data from the main process
    window.electron.ipcRenderer.sendMessage('get-users');

    const handleGetUsers = (userData) => {
      console.log('Received user data:', userData);
      setUsers(userData); // Update state with the received data
    };

    // Listen for the 'users-data' event
    window.electron.ipcRenderer.on('users-data', handleGetUsers);

    // Cleanup listener on unmount
  }, []);

  const navigate = useNavigate();

  const handleLogin = (email) => {
    console.log(`Logging in user: ${email}`);
    // Send a message to the main process to handle login for the user
    window.electron.ipcRenderer.sendMessage('login-user', { email });
  };

  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <Button className="primary-btn" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>

      <div className="users-container">
        <h2 className="users-title">Users Table</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>SR.</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.email}</td>
                <td>
                  <button
                    className="users-action-btn"
                    onClick={() => handleLogin(user.email)}
                  >
                    Login
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Users;
