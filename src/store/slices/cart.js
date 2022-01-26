import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios.js';

const slice = createSlice({
  name: 'cart',
  initialState: {
    cartData: [],
    loading: false,
    error: null,
  },
  reducers: {
    cartRequest: (state, action) => {
      state.loading = true;
    },
    cartRequestSuccess: (state, action) => {
      state.loading = false;
      state.cartData = action.payload;
    },
    cartRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { cartRequest, cartRequestSuccess, cartRequestFail } = slice.actions;
export const fetchProductsInCart = () => async (dispatch) => {
  try {
    dispatch({
      type: cartRequest.type,
    });
    const { data } = await axios.get(`/api/v1/cart`);

    dispatch({
      type: cartRequestSuccess.type,
      payload: data?.cart || [],
    });
  } catch (error) {
    dispatch({
      type: cartRequestFail.type,
      payload: error.message,
    });
  }
};

export const addProductsToCart = (productsData) => async (dispatch) => {
  try {
    dispatch({
      type: cartRequest.type,
    });

    const { data } = await axios.post(`/api/v1/cart`, productsData);
    dispatch({
      type: cartRequestSuccess.type,
      payload: data?.cart,
    });
  } catch (error) {
    dispatch({
      type: cartRequestFail.type,
      payload: error.message,
    });
  }
};

export const removeProductFromCart = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: cartRequest.type,
    });

    const { data } = await axios.delete(`/api/v1/cart/${productId}`);

    dispatch({
      type: cartRequestSuccess.type,
      payload: data?.cart,
    });
  } catch (error) {
    dispatch({
      type: cartRequestFail.type,
      payload: error.message,
    });
  }
};

export const clearCart = () => async (dispatch) => {
  try {
    dispatch({
      type: cartRequest.type,
    });

    await axios.delete(`/api/v1/cart`);

    dispatch({
      type: cartRequestSuccess.type,
      payload: [],
    });
  } catch (error) {
    dispatch({
      type: cartRequestFail.type,
      payload: error.message,
    });
  }
};
