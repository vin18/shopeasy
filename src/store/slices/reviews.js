import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsData: [],
    loading: false,
    error: null,
  },
  reducers: {
    reviewsRequest: (state, action) => {
      state.loading = true;
    },
    reviewsRequestSuccess: (state, action) => {
      state.loading = false;
      state.reviewsData = action.payload;
    },
    reviewsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { reviewsRequest, reviewsRequestSuccess, reviewsRequestFail } =
  slice.actions;

export const fetchProductReviews = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: reviewsRequest.type,
    });
    const { data } = await axios.get(`/api/v1/products/${productId}/reviews`);

    dispatch({
      type: reviewsRequestSuccess.type,
      payload: data?.reviews,
    });
  } catch (error) {
    dispatch({
      type: reviewsRequestFail.type,
      payload: error.message,
    });
  }
};
