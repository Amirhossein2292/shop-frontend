import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
  reducers: {
    addItemToCart: (state, action) => {
      const { productId, name, price, image } = action.payload;
      const existingItem = state.items.find((item) => item.productId === productId);
      if (existingItem) {
        // If item already exists in cart, update the quantity
        existingItem.quantity += 1;
      } else {
        // Otherwise, add the item to cart
        state.items.push({ productId, name, price, image, quantity: 1 });
      }
      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    updateCartItemQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);
      if (item) {
        item.quantity = quantity;
      }
      // Save cart items to local storage
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
  },
});

export const { addItemToCart, removeCartItem, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
