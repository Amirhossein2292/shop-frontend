import React from 'react';
import { Login, RegisterForm, UserProfile, Homepage, ProductList, ProductDetail, MyNavbar, ContactUs, Cart, OrderSummary } from './components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Container>
          <MyNavbar />
        </Container>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/user' element={<UserProfile />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </Router>
    </Provider>
  );
}
