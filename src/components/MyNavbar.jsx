import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../reducers/userSlice';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Badge from 'react-bootstrap/Badge';
import SearchBar from './SearchBar';
import { shoppingCart, myLogo, hamburgerIcon, closeIcon, brand, contact, homepage, shapinto } from '../assets/index';
import { Nav } from 'react-bootstrap';
import './MyNavbar.css';

const MyNavbar = () => {
  const user = useSelector((state) => state.user.user);
  const isProfileLoading = useSelector((state) => state.user.loading);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate('/');
    });
  };

  // Calculate the total quantity of items in the cart
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop View */}
      <div className="desktop-view">
        <Navbar bg="light" className="justify-content-between">
          <div className="d-flex align-items-center">
            <Nav.Link as={Link} to="/cart" className="mr-2">
              <img src={shoppingCart} alt="shop" width={'25px'} />
              {cartQuantity > 0 && (
                <Badge pill>
                  {cartQuantity}
                </Badge>
              )}
            </Nav.Link>
            {!user || isProfileLoading ? (
              <>
                <Nav.Link as={Link} to="/login">
                  <Button variant="outline-primary" style={{ marginLeft: '1rem' }}>
                    Login
                  </Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <Button variant="primary" style={{ marginLeft: '0.5rem' }}>
                    Register
                  </Button>
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/user" style={{ margin: '1rem' }}>
                  <Button variant="danger">Your Profile</Button>
                </Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>
                  <Button variant="danger">Logout</Button>
                </Nav.Link>
              </>
            )}
          </div>
          <Navbar.Brand as={Link} to="/">
            <img src={shapinto} alt="logo" width="150px" />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <SearchBar />
          </div>
        </Navbar>

        {/* Desktop View - Navigation Links */}
        <Navbar bg="light" className="justify-content-center">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/products">
              <span className="navbar-link">
                <img src={brand} alt="brand" width={'20px'} className="navbar-icon" />
                Products
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/contact-us">
              <span className="navbar-link">
                <img src={contact} alt="contact" width={'20px'} className="navbar-icon" />
                Contact Us
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/">
              <span className="navbar-link">
                <img src={homepage} alt="homepage" width={'20px'} className="navbar-icon" />
                Homepage
              </span>
            </Nav.Link>
          </Nav>
        </Navbar>
      </div>

      {/* Mobile View */}
      <div className="mobile-view">
        <Navbar bg="light" className="justify-content-center">
          <Nav.Link as={Link} to="/cart" className="mr-2">
            <img src={shoppingCart} alt="shop" width={'25px'} />
            {cartQuantity > 0 && (
              <Badge pill style={{ top: 0 }}>
                {cartQuantity}
              </Badge>
            )}
          </Nav.Link>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img src={shapinto} alt="logo" width="150px" />
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <button className="btn btn-link" onClick={toggleMobileMenu}>
              {isMobileMenuOpen ? (
                <img src={closeIcon} alt="close" width={'25px'} />
              ) : (
                <img src={hamburgerIcon} alt="menu" width={'25px'} />
              )}
            </button>
          </div>
        </Navbar>

        {/* Mobile View - Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <button className="btn btn-link" onClick={toggleMobileMenu}>
              <img src={closeIcon} alt="close-icon" style={{ width: '24px'}} />
            </button>
            <div className="nav-mobile-links">
              <div className="d-flex align-items-center justify-content-center m-4">
                <SearchBar onClick={closeMobileMenu}  />
              </div>
              <div className="nav-logo">
                <Nav.Link as={Link} to="/products" style={{ marginRight: '0.5rem'}} onClick={closeMobileMenu}>
                  products
                </Nav.Link>
                <img src={brand} alt="brand" width={'22px'}  />
              </div>
              <div className="nav-logo">
                <Nav.Link as={Link} to="/" style={{ marginRight: '0.5rem'}} onClick={closeMobileMenu}>
                  homepage
                </Nav.Link>
                <img src={homepage} alt="brand"  width={'22px'}  />
              </div>
              <div className="nav-logo">
                <Nav.Link as={Link} to="/contact-us" style={{ marginRight: '0.5rem'}} onClick={closeMobileMenu}>
                  contact-us
                </Nav.Link>
                <img src={contact} alt="brand" width={'22px'}  />
              </div>
              <div className="d-flex align-items-center justify-content-center mt-5">
                {!user || isProfileLoading ? (
                  <>
                    <Nav.Link as={Link} to="/login" onClick={closeMobileMenu}>
                      <Button variant="outline-primary" style={{ marginLeft: '1rem' }}>
                        Login
                      </Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/register" onClick={closeMobileMenu}>
                      <Button variant="outline-primary" style={{ marginLeft: '0.5rem' }}>
                        Register
                      </Button>
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={Link} to="/user" style={{ margin: '1rem' }}>
                      <Button variant="danger">Your Profile</Button>
                    </Nav.Link>
                    <Nav.Link as={Link} to="/" onClick={handleLogout}>
                      <Button variant="danger" onClick={closeMobileMenu}>
                        Logout
                      </Button>
                    </Nav.Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MyNavbar;
