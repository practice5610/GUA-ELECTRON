import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
// you will also need the css that comes with bootstrap-daterangepicker
import { toast } from 'react-toastify';

function FormE() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    visaCenter: '',
    dateRange: {
      startDate: '',
      endDate: '',
    },
  });

  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  console.log('token', token);

  useEffect(() => {
    if (token === null) {
      navigate('/dashboard/login');
    }
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form data to send:', formData);
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

  const handleDateChange = (event, picker) => {
    setFormData((prevData) => ({
      ...prevData,
      dateRange: {
        startDate: picker.startDate.format('YYYY-MM-DD'),
        endDate: picker.endDate.format('YYYY-MM-DD'),
      },
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('logout successful');
    navigate('/dashboard/form');
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
      <div style={{ position: 'absolute', right: '10px', top: '10px' }}>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} xs="6" controlId="validationCustom01">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="validationCustom02">
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
          <Form.Group as={Col} xs="6" controlId="validationCustom03">
            <Form.Label>Select User Type</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCenter"
              value={formData.visaCenter}
              onChange={handleInputChange}
            >
              <option value="">-Select User Type-</option>
              <option value="immigrant">Immigrant</option>
              <option value="nonImmigrant">Nonimmigrant</option>
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} xs="6" controlId="validationCustom03">
            <Form.Label>Select Visa Category</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCenter"
              value={formData.visaCenter}
              onChange={handleInputChange}
            >
              <option value="">-Select Visa Category-</option>
              <option value="sb1">sb1</option>
              <option value="lpr">lpr</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} xs="12" controlId="validationCustom03">
            <Form.Label>Select Visa Center</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCenter"
              value={formData.visaCenter}
              onChange={handleInputChange}
            >
              <option value="">-Select Visa Center-</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Karachi">Karachi</option>
            </Form.Select>
          </Form.Group>
        </Row>

        {/* <Row className="mb-3">
          <Form.Group as={Col} xs="12" controlId="validationCustom04">
            <Form.Label>Select Date</Form.Label>
            <DateRangePicker
              initialSettings={{
                startDate: '01/01/2020',
                endDate: '01/15/2020',
              }}
              onApply={handleDateChange}
            >
              <input
                type="text"
                className="form-control"
                placeholder={`${formData.dateRange.startDate} - ${formData.dateRange.endDate}`}
                readOnly
              />
            </DateRangePicker>
          </Form.Group>
        </Row> */}

        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
}

export default FormE;
