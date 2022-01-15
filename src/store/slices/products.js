import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'products',
  initialState: {
    productsData: [],
    adminProductsData: [],
    loading: false,
    error: null,
  },
  reducers: {
    productsRequest: (state, action) => {
      state.loading = true;
    },
    productsRequestSuccess: (state, action) => {
      state.loading = false;
      state.productsData = action.payload;
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
export const fetchProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: productsRequest.type,
    });
    const { data } = await axios.get(`/api/v1/products`);

    dispatch({
      type: productsRequestSuccess.type,
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: productsRequestFail.type,
      payload: error.message,
    });
  }
};

export const fetchAdminProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: productsRequest.type,
    });
    const { data } = await axios.get(`/api/v1/products/admin`);

    dispatch({
      type: productsAdminRequestSuccess.type,
      payload: data?.products,
    });
  } catch (error) {
    dispatch({
      type: productsRequestFail.type,
      payload: error.message,
    });
  }
};
