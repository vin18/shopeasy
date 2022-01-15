import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
    productDeleted: false,
    loading: false,
    error: null,
  },
  reducers: {
    productRequest: (state, action) => {
      state.loading = true;
    },
    productRequestSuccess: (state, action) => {
      state.loading = false;
      state.productData = action.payload;
    },
    productAdminDeleteRequestSuccess: (state, action) => {
      state.loading = false;
      state.productDeleted = true;
    },
    adminProductDeleteReset: (state, action) => {
      state.loading = false;
      state.productDeleted = false;
    },
    productRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
export const {
  productRequest,
  productRequestSuccess,
  productRequestFail,
  productAdminDeleteRequestSuccess,
  adminProductDeleteReset,
} = slice.actions;
export const fetchProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: productRequest.type,
    });
    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: productRequestSuccess.type,
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: productRequestFail.type,
      payload: error.message,
    });
  }
};

export const deleteAdminProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: productRequest.type,
    });
    await axios.delete(`/api/v1/products/admin/${productId}`);

    dispatch({
      type: productAdminDeleteRequestSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: productRequestFail.type,
      payload: error.message,
    });
  }
};
