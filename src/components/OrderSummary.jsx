import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { submitOrder } from '../reducers/orderSlice';
import { selectUser } from '../reducers/userSlice';

const OrderSummary = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const cartItems = useSelector((state) => state.cart.items);
  const [billingAddress, setBillingAddress] = useState('');
  const [note, setNote] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [telephoneNumber, setTelephoneNumber] = useState('');

  const handleOrderSubmit = (e) => {
    e.preventDefault();
  
    if (cartItems && cartItems.length > 0) {
      const orderData = {
        user: user.id,
        billingAddress: billingAddress,
        note: note,
        city: city,
        postalCode: postalCode,
        telephoneNumber: telephoneNumber,
        items: cartItems.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };
  
      console.log('Order Data:', orderData); // Log the orderData object
      console.log('User Data:', user);
      dispatch(submitOrder(orderData))
        .then(() => {
          console.log('Order submitted successfully');
          // Redirect to the order success page or display a success message
        })
        .catch((error) => {
          console.error('Error submitting order:', error);
          // Display an error message or redirect to an error page
        });
    } else {
      console.error('No order items available');
      // Display an error message or perform appropriate action
    }
  };

  return (
    <div>
      <h2>Order Summary</h2>
      <Form onSubmit={handleOrderSubmit}>
        <Form.Group controlId="billingAddress">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter billing address"
            value={billingAddress}
            onChange={(e) => setBillingAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="note">
          <Form.Label>Note</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control as="select" value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select a city</option>
            <option value="Tehran">Tehran</option>
            <option value="Karaj">Karaj</option>
            <option value="Fardis">Fardis</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="postalCode">
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter postal code"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="telephoneNumber">
          <Form.Label>Telephone Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter telephone number"
            value={telephoneNumber}
            onChange={(e) => setTelephoneNumber(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit Order
        </Button>
      </Form>
    </div>
  );
};

export default OrderSummary;
