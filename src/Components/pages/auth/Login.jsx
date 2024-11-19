import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import vfsServices from '../../../redux/api/vfsServices';

function Login() {
  const navigate = useNavigate();
  const [validated, setValidated] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    setisLoading(true);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      setisLoading(false);
    } else {
      try {
        const res = await vfsServices.login(formData); // Sending form data in API

        if (res.status === 200) {
          setisLoading(false);
          localStorage.setItem('token', res?.data?.token);
          toast.success(res?.data?.message);
          navigate('/dashboard/form');
        }
      } catch (error) {
        console.error('Error:', error);
        toast.error('Login failed. Please check your credentials.');
      }
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
              type="email" // Changed to "email" for better semantics and validation
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
            Login
          </Button>
        </Row>
      </Form>
    </Container>
  );
}

export default Login;
