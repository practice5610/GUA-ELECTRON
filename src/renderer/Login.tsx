import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      formData.email === 'admin123@gmail.com' &&
      formData.password === 'usAppointment!'
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
        <Row className="mb-3">
          <Form.Group as={Col} xs="12" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} xs="12" controlId="validationCustom02">
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Button
            disabled={isLoading}
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
