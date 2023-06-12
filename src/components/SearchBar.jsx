import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../reducers/productSlice';
import { BsSearch } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { Image } from 'react-bootstrap';

const SearchBar = ({ onClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchResults = useSelector((state) => state.product.searchResults);
  const searchContainerRef = useRef(null);
  const inputRef = useRef(null);

  const handleSearch = () => {
    dispatch(searchProducts(searchQuery));
    setShowResults(true);
  };

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    dispatch(searchProducts(e.target.value));
    setShowResults(true);
  };

  const handleProductClick = (productId) => {
    navigate(`/products/${productId}`);
    setSearchQuery(''); // Clear search query after clicking on a search result
    onClick(); // Close the mobile menu
  };

  const handleMouseClick = (event) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target) &&
      !event.target.classList.contains('search-result-item')
    ) {
      setShowResults(false);
      setSearchQuery(''); // Clear search query after clicking anywhere outside the search bar
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleMouseClick);
    return () => {
      document.removeEventListener('click', handleMouseClick);
    };
  }, []);

  return (
    <div style={{ marginBottom: '1rem', position: 'relative', zIndex: '999' }}>
      <div style={{ display: 'flex', alignItems: 'center' }} ref={searchContainerRef}>
        <input
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleChange}
          style={{
            padding: '0.5rem',
            marginRight: '0.5rem',
            border: '1px solid #ccc',
            borderRadius: '4px',
            paddingRight: '2rem', // Add right padding to accommodate the search icon
          }}
          ref={inputRef}
        />
        <BsSearch
          onClick={handleSearch}
          style={{ cursor: 'pointer', position: 'absolute', right: '1rem' }}
        />
      </div>
      {showResults && searchResults.length > 0 && (
        <div
          style={{
            marginTop: '1rem',
            position: 'absolute',
            background: '#fff',
            padding: '1rem',
            borderRadius: '4px',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            width: '100%',
          }}
        >
          {searchResults.map((product) => (
            <div
              key={product.id}
              className="search-result-item" // Add class name for identifying search result item
              style={{
                marginBottom: '1rem',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                cursor: 'pointer',
              }}
              onClick={() => handleProductClick(product.id)}
            >
              <Image src={product.image} alt={product.name} style={{ width: '80px', marginRight: '1rem' }} />
              <span style={{ fontSize: '14px' }}>{product.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
