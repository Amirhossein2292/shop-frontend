import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import productReducer from './reducers/productSlice';
import paginationReducer from './reducers/paginationSlice';
import cartReducer from './reducers/cartSlice';
import orderReducer from './reducers/orderSlice'; // Import the order reducer

const store = configureStore({
  reducer: {
    user: userReducer,
    product: productReducer,
    pagination: paginationReducer,
    cart: cartReducer,
    order: orderReducer, // Add the order reducer to the store
  },
});

export default store;
