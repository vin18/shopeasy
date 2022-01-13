import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: [],
    singleOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    ordersRequest: (state, action) => {
      state.loading = true;
    },
    ordersRequestSuccess: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },
    orderRequestSuccess: (state, action) => {
      state.loading = false;
      state.singleOrder = action.payload;
    },
    ordersRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.singleOrder = null;
      state.allOrders = null;
    },
  },
});

export default slice.reducer;

// Actions
const {
  ordersRequest,
  ordersRequestSuccess,
  orderRequestSuccess,
  ordersRequestFail,
} = slice.actions;

export const fetchAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ordersRequest.type,
    });
    const { data } = await axios.get(`/api/v1/orders`);

    dispatch({
      type: ordersRequestSuccess.type,
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: ordersRequestFail.type,
      payload: error.message,
    });
  }
};
