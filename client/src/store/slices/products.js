import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'products',
  initialState: {
    productsData: [],
    adminProductsData: [],
    loading: false,
    error: null,
    pages: 6,
    page: 1,
  },
  reducers: {
    productsRequest: (state, action) => {
      state.loading = true;
    },
    productsRequestSuccess: (state, action) => {
      const { products, pages, page } = action.payload;

      state.loading = false;
      state.productsData = products;
      state.pages = pages;
      state.page = page;
    },
    productsAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.adminProductsData = action.payload;
    },
    productsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
export const {
  productsRequest,
  productsRequestSuccess,
  productsRequestFail,
  productsAdminRequestSuccess,
} = slice.actions;
export const fetchProducts =
  (keyword = '', pageNumber = '', sort, rating) =>
  async (dispatch) => {
    try {
      dispatch({
        type: productsRequest.type,
      });
      const { data } = await axios.get(
        `/api/v1/products?keyword=${keyword}&pageNumber=${pageNumber}&sort=${sort}&rating=${rating}`
      );

      dispatch({
        type: productsRequestSuccess.type,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: productsRequestFail.type,
        payload: error.response.data.msg,
      });
    }
  };
