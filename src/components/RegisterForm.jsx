import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

import { Form, Button, Container, Alert } from 'react-bootstrap';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.user.loading);
  const error = useSelector((state) => state.user.error);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any required field is empty
    if (!formData.username || !formData.email || !formData.password) {
      return;
    }

    dispatch(registerUser(formData))
      .then(() => {
        if (!error) {
          navigate('/login');
        }
      })
      .catch((error) => {
        console.log('Registration error:', error);
      });
  };

  const parseError = (error) => {
    if (error.response && error.response.data && error.response.data.detail) {
      return error.response.data.detail;
    }
    return 'An error occurred during registration.';
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>

        {error && <Alert variant="danger">{parseError(error)}</Alert>}

        <Button variant="primary" type="submit" disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? 'Loading...' : 'Register'}
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterForm;
