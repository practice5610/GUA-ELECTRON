import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setIsLoading(true);

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      setIsLoading(false);
      return;
    }

    try {
      // Make an API call using Axios
      const res = await axios.post(
        'http://localhost:3000/admin/login',
        formData,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      );

      if (res.status === 200) {
        setIsLoading(false);
        localStorage.setItem('token', res.data.token); // Save token in localStorage
        toast.success(res.data.message || 'Login successful');
        navigate('/form'); // Redirect to the dashboard
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error.response || error.message);
      toast.error(
        error.response?.data?.message || 'Login failed. Please try again.',
      );
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
