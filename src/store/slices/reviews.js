import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsData: [],
    loading: false,
    error: null,
    reviewPosted: false,
  },
  reducers: {
    reviewsRequest: (state, action) => {
      state.loading = true;
    },
    reviewsRequestSuccess: (state, action) => {
      state.loading = false;
      state.reviewsData = action.payload;
    },
    reviewPostSuccess: (state, action) => {
      state.loading = false;
      state.reviewPosted = true;
    },
    reviewReset: (state, loading) => {
      state.reviewPosted = false;
    },
    reviewsRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
export const {
  reviewsRequest,
  reviewsRequestSuccess,
  reviewsRequestFail,
  reviewPostSuccess,
  reviewReset,
} = slice.actions;

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

export const postProductReview = (review) => async (dispatch) => {
  try {
    dispatch({
      type: reviewsRequest.type,
    });
    const { data } = await axios.post(`/api/v1/reviews`, review);

    dispatch({
      type: reviewsRequestSuccess.type,
      payload: data?.reviews,
    });

    dispatch({
      type: reviewPostSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: reviewsRequestFail.type,
      payload: error.message,
    });
  }
};
