import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

interface User {
  email: string;
}

interface FormData {
  userType: string;
  deliveryAddress: string;
  centre: string;
  category: string;
}

interface FormData2 {
  Visa_Priority: string;
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    userType: '',
    deliveryAddress: '',
    centre: '',
    category: '',
  });
  const [formData2, setFormData2] = useState<FormData2>({
    Visa_Priority: 'Regular',
  });

  const navigate = useNavigate();

  useEffect(() => {
    window.electron.ipcRenderer.sendMessage('get-users');

    const handleGetUsers = (userData: User[]) => {
      setUsers(userData);
    };

    window.electron.ipcRenderer.on('users-data', handleGetUsers);

    return () => {
      window.electron.ipcRenderer.removeListener('users-data', handleGetUsers);
    };
  }, []);

  const handleLogin = (email: string) => {
    window.electron.ipcRenderer.sendMessage('login-user', { email });
  };

  const handleOpen = (uemail: string) => {
    setEmail(uemail);
    setShowModal(true);
  };

  const handleOpen2 = (uemail: string) => {
    setEmail(uemail);
    setShowModal2(true);
  };

  const handleClose = () => {
    setFormData({
      userType: '',
      deliveryAddress: '',
      centre: '',
      category: '',
    });
    setShowModal(false);
  };

  const handleClose2 = () => {
    setFormData2({
      Visa_Priority: '',
    });
    setShowModal2(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormData2((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    window.electron.ipcRenderer.sendMessage('book-appoint', {
      email,
      formData,
    });
    handleClose();
  };

  const handleSubmit2 = () => {
    window.electron.ipcRenderer.sendMessage('book-appoint2', {
      email,
      formData2,
    });
    handleClose2();
  };

  return (
    <div>
      <div className="header">
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
                  <div className="action-buttons">
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
                    <button
                      className="users-action-btn"
                      onClick={() => handleOpen2(user.email)}
                    >
                      Continue
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AppointmentModal
        show={showModal}
        handleClose={handleClose}
        formData={formData}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <AppointmentModal2
        show={showModal2}
        handleClose={handleClose2}
        formData2={formData2}
        handleInputChange={handleInputChange}
        handleSubmit2={handleSubmit2}
      />
    </div>
  );
};

interface AppointmentModalProps {
  show: boolean;
  handleClose: () => void;
  formData: FormData;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: () => void;
}

const AppointmentModal: React.FC<AppointmentModalProps> = ({
  show,
  handleClose,
  formData,
  handleInputChange,
  handleSubmit,
}) => (
  <Modal show={show} onHide={handleClose} className="modal">
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
    <Modal.Body>
      <Form>
        <Form.Group
          as={Col}
          xs="12"
          className="group"
          controlId="validationCustom03"
        >
          <Form.Label>Select User Type</Form.Label>
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
        <Form.Group
          as={Col}
          xs="12"
          className="group"
          controlId="validationCustom03"
        >
          <Form.Label>Select Centre</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="centre"
            value={formData.centre}
            onChange={handleInputChange}
            className="inputs"
          >
            <option value="">-Select Centre-</option>
            <option value="islamabad">ISLAMABAD</option>
            <option value="karachi">KARACHI</option>
          </Form.Select>
        </Form.Group>
        <Form.Group
          as={Col}
          xs="12"
          className="group"
          controlId="validationCustom03"
        >
          <Form.Label>Select Category</Form.Label>
          <Form.Select
            aria-label="Default select example"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="inputs"
          >
            <option value="">-Select Category-</option>
            {formData.userType === 'nonImmigrant' && (
              <option value="btv">Business & Tourism Visitors</option>
            )}
            {formData.userType === 'immigrant' && (
              <>
                <option value="sb1">SB1</option>
                <option value="lpr">LPR</option>
              </>
            )}
          </Form.Select>
        </Form.Group>
        {formData.userType === 'immigrant' && (
          <Form.Group
            as={Col}
            xs="12"
            className="group"
            controlId="validationCustom04"
          >
            <Form.Label>Registration of Passport's Delivery Address</Form.Label>
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
    <Modal.Footer>
      <Button className="users-action-btn" onClick={handleClose}>
        Cancel
      </Button>
      <Button className="users-action-btn" onClick={handleSubmit}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

interface AppointmentModal2Props {
  show: boolean;
  handleClose: () => void;
  formData2: FormData2;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit2: () => void;
}

const AppointmentModal2: React.FC<AppointmentModal2Props> = ({
  show,
  handleClose,
  formData2,
  handleInputChange,
  handleSubmit2,
}) => (
  <Modal show={show} onHide={handleClose} className="modal">
    <Modal.Header
      closeButton
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Modal.Title style={{ color: '#000' }}>Select Visa Priority</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Group
          as={Col}
          xs="12"
          className="group"
          controlId="validationCustom03"
        >
          <Form.Select
            aria-label="Default select example"
            name="Visa_Priority"
            value={formData2.Visa_Priority}
            onChange={handleInputChange}
            className="inputs"
          >
            <option value="">-Select Visa Priority-</option>
            <option value="Regular">Regular</option>
            <option value="Previously_Refused">Previously Refused</option>
            <option value="Interview_Waiver">Interview Waiver</option>
          </Form.Select>
        </Form.Group>
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button className="users-action-btn" onClick={handleClose}>
        Cancel
      </Button>
      <Button className="users-action-btn" onClick={handleSubmit2}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Users;
