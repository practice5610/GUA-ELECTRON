import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-users');

    const handleGetUsers = (userData) => {
      setUsers(userData); // Update state with the received data
    };

    window.electron.ipcRenderer.on('users-data', handleGetUsers);
  }, []);
  // const users = [
  //   { id: 1, email: 'user1@example.com' },
  //   { id: 2, email: 'user2@example.com' },
  //   { id: 3, email: 'user3@example.com' },
  //   { id: 4, email: 'user4@example.com' },
  //   { id: 5, email: 'user5@example.com' },
  //   { id: 6, email: 'user6@example.com' },
  //   { id: 7, email: 'user7@example.com' },
  //   { id: 8, email: 'user8@example.com' },
  //   { id: 9, email: 'user9@example.com' },
  //   { id: 10, email: 'user10@example.com' },
  // ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem);

  console.log(users, currentUsers);
  const totalPages = Math.ceil(users?.length / itemsPerPage);

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);
  const navigate = useNavigate();
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button className="primary-btn" onClick={() => navigate(-1)}>
          Users
        </Button>
        ,
      </div>
      <div className="users-container">
        <h2 className="users-title">Users Table</h2>
        <table className="users-table">
          <thead>
            <tr>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((index, user) => (
              <tr key={index}>
                <td>{user?.email}</td>
                <td>
                  <button
                    className="users-action-btn"
                    onClick={() => alert(`Clicked on ${user.email}`)}
                  >
                    Action
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination-container">
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            First
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${
                index + 1 === currentPage ? 'active' : ''
              }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
          <button
            className="pagination-btn"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last
          </button>
        </div>
      </div>
    </>
  );
}

export default Users;
