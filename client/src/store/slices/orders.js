import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'orders',
  initialState: {
    allOrders: [],
    orderDelivered: false,
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
    orderDeliveredRequestSuccess: (state, action) => {
      state.loading = false;
      state.orderDelivered = true;
    },
    orderDeliveredReset: (state, action) => {
      state.loading = false;
      state.orderDelivered = false;
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
export const {
  ordersRequest,
  ordersRequestSuccess,
  orderRequestSuccess,
  ordersRequestFail,
  orderDeliveredRequestSuccess,
  orderDeliveredReset,
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
      payload: error.response.data.msg,
    });
  }
};

export const orderDelivered = (orderId) => async (dispatch) => {
  try {
    dispatch({
      type: ordersRequest.type,
    });

    await axios.patch(`/api/v1/orders/admin/order-delivered/${orderId}`);

    dispatch({
      type: orderDeliveredRequestSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: ordersRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};
