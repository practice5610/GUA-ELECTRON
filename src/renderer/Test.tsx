import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function FormE() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: '',
    visaCategory: '',
    visaCenter: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token === null) {
      navigate('/');
    }
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form data to send:', formData);
      window.electron.ipcRenderer.sendMessage('login-event', formData);
    }

    setValidated(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('logout successful');
    navigate('/');
  };

  return (
    <Container
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          position: 'absolute',

          top: '10px',
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <Button className="primary-btn" onClick={() => navigate('/users')}>
          Users
        </Button>
        <Button className="primary-btn" onClick={handleLogout}>
          Log out
        </Button>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className=" mbc flex-row">
          <Form.Group
            as={Col}
            xs="6"
            className="group"
            controlId="validationCustom01"
          >
            <Form.Label className="label">Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="inputs"
            />
          </Form.Group>
          <Form.Group
            as={Col}
            xs="6"
            className="group"
            controlId="validationCustom02"
          >
            <Form.Label className="label">Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="inputs"
            />
          </Form.Group>
        </Row>
        <Row className=" flex-row mbc">
          <Form.Group
            as={Col}
            xs="12"
            style={{ width: '100%' }}
            className="group"
            controlId="validationCustom03"
          >
            <Form.Label className="label">Select User Type</Form.Label>
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
        </Row>
        <Row className=" flex-row mbc">
          <Form.Group
            as={Col}
            xs="12"
            style={{ width: '100%' }}
            className="group"
            controlId="validationCustom03"
          >
            <Form.Label className="label">Select Visa Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCategory"
              value={formData.visaCategory}
              onChange={handleInputChange}
              className="inputs"
            >
              <option value="">-Select Visa Category-</option>
              <option value="B1">B1</option>
              <option value="B2">B2</option>
              <option value="b1/b2">b1/b2</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className=" flex-row mbc">
          <Form.Group
            as={Col}
            xs="12"
            style={{ width: '100%' }}
            className="group"
            controlId="validationCustom03"
          >
            <Form.Label className="label">Select Visa Center</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCenter"
              value={formData.visaCenter}
              onChange={handleInputChange}
              className="inputs"
            >
              <option value="">-Select Visa Center-</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Karachi">Karachi</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="" style={{ textAlign: 'center' }}>
          <Button className="primary-btn" type="submit">
            Submit form
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default FormE;
