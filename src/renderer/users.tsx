import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Users() {
  const [users, setUsers] = useState([]);
  const [Email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    deliveryAddress: '',
  });
  console.log(formData);
  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-users');

    const handleGetUsers = (userData) => {
      console.log('Received user data:', userData);
      setUsers(userData);
    };

    window.electron.ipcRenderer.on('users-data', handleGetUsers);

    return;
  }, []);

  const navigate = useNavigate();

  const handleLogin = (email) => {
    console.log(`Logging in user: ${email}`);
    window.electron.ipcRenderer.sendMessage('login-user', { email });
  };

  const handleOpen = (uemail) => {
    setEmail(uemail);
    setShowModal(true);
  };
  const handleClose = () => {
    setFormData({
      userType: '',
      deliveryAddress: '',
    });
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    window.electron.ipcRenderer.sendMessage('book-appoint', {
      email: Email,
      formData,
    });
    handleClose();
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
                <td style={{ color: '#fff' }}>{index + 1}</td>
                <td style={{ color: '#fff' }}>{user.email}</td>
                <td>
                  <div
                    style={{
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'center',
                    }}
                  >
                    <button
                      className="users-action-btn"
                      onClick={() => handleLogin(user.email)}
                    >
                      Login
                    </button>
                    <button
                      className="users-action-btn"
                      onClick={() => handleOpen(user.email)}
                    >
                      Book Appointment
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Booking Appointment */}
      <Modal show={showModal} onHide={handleClose} className="modal">
        <Modal.Header
          closeButton
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Modal.Title style={{ color: '#000' }}>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ marginTop: '1rem' }}>
          <Form>
            <Form.Group
              as={Col}
              xs="12"
              style={{ width: '100%' }}
              className="group"
              controlId="validationCustom03"
            >
              <Form.Label className="label" style={{ color: '#000' }}>
                Select User Type
              </Form.Label>
              <Form.Select
                aria-label="Default select example"
                name="userType"
                value={formData.userType}
                onChange={handleInputChange}
                className="inputs"
              >
                <option value="">-Select User Type-</option>
                <option value="immigrant">Immigrant</option>
                <option value="nonImmigrant">Nonimmigrant</option>
              </Form.Select>
            </Form.Group>

            {formData.userType === 'immigrant' && (
              <Form.Group
                as={Col}
                xs="12"
                style={{ width: '100%', marginTop: '15px' }}
                controlId="validationCustom04"
              >
                <Form.Label className="label" style={{ color: '#000' }}>
                  Registration of Passport's Delivery Address
                </Form.Label>
                <Form.Control
                  type="text"
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleInputChange}
                  placeholder="Enter delivery address"
                  className="inputs"
                />
              </Form.Group>
            )}
          </Form>
        </Modal.Body>
        <Modal.Footer
          style={{
            marginTop: '1rem',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '10px',
            alignItems: 'center',
          }}
        >
          <Button className="users-action-btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="users-action-btn" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Users;
