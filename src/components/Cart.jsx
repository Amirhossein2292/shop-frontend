import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeCartItem, updateCartItemQuantity } from '../reducers/cartSlice';
import { Container, Table, Button, Image } from 'react-bootstrap';
import { selectUser } from '../reducers/userSlice';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleRemoveItem = (productId) => {
    dispatch(removeCartItem(productId));
  };

  const handleQuantityChange = (productId, quantity) => {
    dispatch(updateCartItemQuantity({ productId, quantity }));
  };

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    cartItems.forEach((item) => {
      const { price, quantity } = item;
      totalPrice += price * quantity;
    });
    return totalPrice.toFixed(2);
  };

  const handleOrder = () => {
    if (user) {
      // User is authenticated, proceed with the order
      // Implement your order handling logic here
      navigate('/order-summary');
    } else {
      // User is not authenticated, redirect to login page
      navigate('/login');
    }
  };

  return (
    <Container style={{ marginTop: '4rem' }}>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.productId}>
                  <td>
                    <Image src={item.image} alt={item.name} thumbnail style={{ width: '100px' }} />
                  </td>
                  <td>{item.name}</td>
                  <td>${item.price}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value))}
                    />
                  </td>
                  <td>${(item.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleRemoveItem(item.productId)}>
                      Remove
                    </Button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="4" style={{ textAlign: 'right' }}>
                  Total:
                </td>
                <td>${calculateTotalPrice()}</td>
                <td>
                  <Button variant="primary" onClick={handleOrder}>
                    Order
                  </Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default Cart;
