import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'products',
  initialState: {
    productsData: [],
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
    productsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { productsRequest, productsRequestSuccess, productsRequestFail } =
  slice.actions;
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
