import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductList } from '../reducers/productSlice';
import { Card, Row, Col, Button, Container, Spinner, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import cartIcon from '../assets/cart-icon.png';

import {
  setCurrentPage,
  selectCurrentPage,
  setTotalItems,
  setPageSize,
} from '../reducers/paginationSlice';
import { addItemToCart, updateCartItemQuantity } from '../reducers/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.product.productList);
  const cartItems = useSelector((state) => state.cart.items);
  const loading = useSelector((state) => state.product.loading);
  const currentPage = useSelector(selectCurrentPage);
  const pageSize = 4; // Number of items per page
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState('all'); // New state variable for selected category
  const categoryNames = [...new Set(productList.map((product) => product.category_name))]; // Get unique category names from productList
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    dispatch(setPageSize(pageSize)); // Set the page size in the pagination slice
    dispatch(fetchProductList({ page: currentPage, pageSize }));
  }, [dispatch, currentPage, pageSize]);

  useEffect(() => {
    dispatch(setTotalItems(productList.length)); // Set the total items in the pagination slice
  }, [dispatch, productList.length]);

  const handleDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = (product) => {
    const existingCartItem = cartItems.find((item) => item.productId === product.id);

    if (existingCartItem) {
      // If the product already exists in the cart, update its quantity
      dispatch(updateCartItemQuantity({ productId: product.id, quantity: existingCartItem.quantity + 1 }));
    } else {
      // If the product is not in the cart, add it as a new item
      dispatch(addItemToCart({ productId: product.id, name: product.name, price: product.price, image: product.image }));
    }

    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 2000);
  };

  const handlePageClick = (page) => {
    dispatch(setCurrentPage(page));
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  // Filter products based on the selected category
  const filteredProducts = selectedCategory === 'all'
    ? productList
    : productList.filter((product) => product.category_name === selectedCategory);

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, filteredProducts.length);
  const currentPageItems = filteredProducts.slice(startIndex, endIndex);

  return (
    <Container>
      {/* Category buttons */}
      <div style={{ marginBottom: '1rem', marginTop: '4rem' }}>
        <Button
          variant={selectedCategory === 'all' ? 'primary' : 'outline-primary'}
          style={{ marginRight: '0.5rem' }}
          onClick={() => handleCategorySelect('all')}
        >
          All
        </Button>
        {categoryNames.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'primary' : 'outline-primary'}
            style={{ marginRight: '0.5rem' }}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </Button>
        ))}
      </div>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <Row>
          {currentPageItems.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
              <Card className="product-card">
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>${product.price}</Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Button
                      variant="primary"
                      onClick={() => handleDetailPage(product.id)}
                      className="mr-2"
                    >
                      View ...
                    </Button>
                    <img
                      src={cartIcon}
                      alt="cart"
                      style={{ width: '45px', objectFit: 'fill', cursor: 'pointer' }}
                      onClick={() => handleAddToCart(product)}
                    />
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center mt-4">
        <Pagination
          activePage={currentPage}
          itemsCountPerPage={pageSize}
          totalItemsCount={filteredProducts.length}
          pageRangeDisplayed={5}
          onChange={handlePageClick}
          itemClass="page-item"
          linkClass="page-link"
          prevPageText="Previous"
          nextPageText="Next"
        />
      </div>

      {showAlert && (
        <Alert
          variant="success"
          style={{ position: 'fixed', top: '0', left: '50%', transform: 'translateX(-50%)', zIndex: '9999' }}
        >
          The product has been added to your cart.
        </Alert>
      )}
    </Container>
  );
};

export default ProductList;
