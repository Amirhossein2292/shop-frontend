import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  pageSize: 4,
  totalItems: 0,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload;
    },
    setTotalItems: (state, action) => {
      state.totalItems = action.payload;
    },
  },
});

export const {
  setCurrentPage,
  setPageSize,
  setTotalItems,
} = paginationSlice.actions;

export default paginationSlice.reducer;

export const selectCurrentPage = (state) => state.pagination.currentPage;
export const selectTotalPages = (state) =>
  Math.ceil(state.pagination.totalItems / state.pagination.pageSize);
