import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

export const fetchProductList = createAsyncThunk(
  'product/fetchProductList',
  async ({ page, pageSize }) => {
    const response = await axios.get(
      `http://localhost:8000/api/products?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  }
);

export const fetchProductDetails = createAsyncThunk(
  'product/fetchProductDetails',
  async (productId) => {
    const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
    return response.data;
  }
);

export const fetchRelatedProducts = createAsyncThunk(
  'product/fetchRelatedProducts',
  async (category) => {
    const response = await axios.get(`http://localhost:8000/api/products?category=${category}`);
    return response.data;
  }
);

export const searchProducts = createAsyncThunk(
  'product/searchProducts',
  async (searchQuery) => {
    if (!searchQuery) {
      // Return all products if search query is empty
      return [];
    }
    
    const response = await axios.get(`http://localhost:8000/api/products?search=${searchQuery}`);
    const matchingProducts = response.data.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return matchingProducts;
  }
);



const productSlice = createSlice({
  name: 'product',
  initialState: {
    productList: [],
    productDetail: null,
    relatedProducts: [],
    searchResults: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductList.fulfilled, (state, action) => {
        state.loading = false;
        state.productList = action.payload;
      })
      .addCase(fetchProductList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.productDetail = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchRelatedProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRelatedProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.relatedProducts = action.payload;
      })
      .addCase(fetchRelatedProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(searchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
