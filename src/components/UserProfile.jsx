import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile, selectProfile } from '../reducers/userSlice';
import { Container, Row, Col, Card } from 'react-bootstrap';
const UserProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectProfile);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  return (
    <Container>
      <h2>User Profile</h2>
      <Card>
        <Card.Body>
          {profile ? (
            <>
              <Row>
                <Col>
                  <p>Username: {profile.username}</p>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p>Email: {profile.email}</p>
                </Col>
              </Row>
            </>
          ) : (
            <p>Loading profile...</p>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UserProfile;
