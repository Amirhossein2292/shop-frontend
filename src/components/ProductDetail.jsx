import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetails, fetchRelatedProducts } from '../reducers/productSlice';
import { Container, Row, Col, Image, Button, Carousel, Alert } from 'react-bootstrap';
import cartIcon from '../assets/cart-icon.png';
import { addItemToCart } from '../reducers/cartSlice';
import './css/animation.css'; // Import the CSS file for animations


const ProductDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product.productDetail);
  const relatedProducts = useSelector((state) => state.product.relatedProducts);
  const loading = useSelector((state) => state.product.loading);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  
  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (product?.category) {
      dispatch(fetchRelatedProducts(product.category));
    }
  }, [dispatch, product?.category]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>No product found.</div>;
  }

  const handleDetailPage = (productId) => {
    navigate(`/products/${productId}`);
  };

  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    );
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  
    // Add a CSS class to the cart icon for animation
    const cartIcon = document.getElementById('cart-icon');
    cartIcon.classList.add('cart-icon-animation');
  };
  

  const filteredRelatedProducts = relatedProducts.filter(
    (relatedProduct) => relatedProduct.category === product.category && relatedProduct.id !== product.id
  );

  return (
    <Container style={{ marginTop: '0.75rem' }}>
      <Row>
        <Col xs={12} md={6}>
          <a href={product.image} target="_blank" rel="noopener noreferrer">
            <Image
              src={product.image}
              alt={product.name}
              fluid
              style={{ maxHeight: '300px', objectFit: 'contain', cursor: 'pointer' }}
            />
          </a>
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <img
            src={cartIcon}
            alt="cart"
            width={50}
            style={{ cursor: 'pointer' }}
            onClick={handleAddToCart}
            id="cart-icon" // Add an id to the cart icon image element
          />

          {showAlert && <>
            <Alert variant='success'>The product has been added to your cart.</Alert>
          </>}
        </Col>
      </Row>
      <h2 className="mt-4 mb-3">Related Products</h2>
      {filteredRelatedProducts.length > 0 ? (
        <Carousel indicators={false} prevIcon={<span>&#60;</span>} nextIcon={<span>&#62;</span>}>
          {filteredRelatedProducts.map((relatedProduct) => (
            <Carousel.Item key={relatedProduct.id}>
              <Image
                src={relatedProduct.image}
                alt={relatedProduct.name}
                fluid
                thumbnail
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
              <Carousel.Caption className="mt-2">
                <h4 style={{ color: 'black'}}>{relatedProduct.name}</h4>
                <p style={{ color: 'black'}}>Price: {relatedProduct.price}</p>
                <Button variant="primary" onClick={() => handleDetailPage(relatedProduct.id)}>
                  View Details
                </Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p>No related products found.</p>
      )}
    </Container>
  );
};

export default ProductDetail;
