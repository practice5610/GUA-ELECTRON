/* eslint-disable no-console */
import { useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import vfsServices from '../../redux/api/vfsServices';
import 'bootstrap/dist/css/bootstrap.css';
// you will also need the css that comes with bootstrap-daterangepicker
import 'bootstrap-daterangepicker/daterangepicker.css';

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

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      console.log('Form data to send:', formData);

      try {
        const res = await vfsServices.login(formData); // Sending form data in API
        console.log('API Response:', res);
      } catch (error) {
        console.error('Error:', error);
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

  const handleDateChange = (event, picker) => {
    setFormData((prevData) => ({
      ...prevData,
      dateRange: {
        startDate: picker.startDate.format('YYYY-MM-DD'),
        endDate: picker.endDate.format('YYYY-MM-DD'),
      },
    }));
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
          <Form.Group as={Col} xs="12" controlId="validationCustom03">
            <Form.Label>Select Visa Center</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="visaCenter"
              value={formData.visaCenter}
              onChange={handleInputChange}
            >
              <option value="">-Select Visa center-</option>
              <option value="Islamabad">Islamabad</option>
              <option value="Karachi">Karachi</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row className="mb-3">
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
        </Row>

        <Button type="submit">Submit form</Button>
      </Form>
    </Container>
  );
}

export default FormE;
