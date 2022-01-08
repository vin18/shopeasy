import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
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
    productRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { productRequest, productRequestSuccess, productRequestFail } =
  slice.actions;
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
