import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, fetchUserProfile } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform basic form validation
    const formErrors = {};
    if (!email) {
      formErrors.email = 'Email is required';
    }
    if (!password) {
      formErrors.password = 'Password is required';
    }

    // If there are no errors, dispatch the loginUser action
    if (Object.keys(formErrors).length === 0) {
      dispatch(loginUser({ email, password }))
        .then((action) => {
          if (action.payload) {
            dispatch(fetchUserProfile());
            navigate('/user');
            localStorage.setItem('token', action.payload.access); // Store the token in local storage
          }
        })
        .catch((error) => {
          console.error('Error logging in:', error);
          setErrors({ login: 'Invalid email or password' });
        });
    } else {
      setErrors(formErrors);
    }
  };

  useEffect(() => {
    // Check for token in local storage on page load
    const token = localStorage.getItem('token');
    const isAuthenticated = !!token; // Check if token exists

    console.log('Token:', token);
    console.log('Is Authenticated:', isAuthenticated);

    if (isAuthenticated) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, email, password]); // Add email and password to the dependency array

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
            isInvalid={!!errors.email}
          />
          {errors.email && <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>}
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            isInvalid={!!errors.password}
          />
          {errors.password && <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>}
        </Form.Group>

        {errors.login && <Alert variant="danger">{errors.login}</Alert>}

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default LoginForm;
