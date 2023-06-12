import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000'; // Replace with your base URL

export const submitOrder = createAsyncThunk(
  'order/submit',
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/orders/`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    isLoading: false,
    error: null,
    order: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(submitOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.order = null;
      })
      .addCase(submitOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(submitOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const selectLoading = (state) => state.order.isLoading;
export const selectError = (state) => state.order.error;
export const selectOrder = (state) => state.order.order;

export default orderSlice.reducer;
