import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: 'usdoc@gmail.com',
    password: 'usAppointment123!',
  });

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setIsLoading(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setIsLoading(false);
      return;
    }

    // Simulate login logic
    if (
      formData.email === 'usdoc@gmail.com' &&
      formData.password === 'usAppointment123!' &&
      new Date() < new Date('2025-01-01')
    ) {
      setIsLoading(false);
      toast.success('Login successful');
      localStorage.setItem('token', '123133');
      navigate('/form'); // Redirect to the dashboard
    } else {
      setIsLoading(false);
      toast.error('Invalid credentials. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <Container
      style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3 mbc">
          <Form.Group
            as={Col}
            xs="12"
            className="group"
            controlId="validationCustom01"
          >
            <Form.Label className="label" style={{ color: '#fff' }}>
              Email
            </Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="inputs"
            />
          </Form.Group>
        </Row>
        <Row className="mb-3 mbc">
          <Form.Group
            as={Col}
            xs="12"
            className="group"
            controlId="validationCustom02"
          >
            <Form.Label className="label" style={{ color: '#fff' }}>
              Password
            </Form.Label>
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
        <Row className="mb-3" style={{ textAlign: 'center' }}>
          <Button
            disabled={isLoading}
            className="primary-btn"
            style={{ textAlign: 'center' }}
            type="submit"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
