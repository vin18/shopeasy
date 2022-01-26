import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'reviews',
  initialState: {
    reviewsData: [],
    loading: false,
    error: null,
    reviewPosted: false,
    reviewUpdated: false,
    reviewRemoved: false,
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
    reviewUpdateSuccess: (state, action) => {
      state.loading = false;
      state.reviewUpdated = true;
    },
    reviewRemoveSuccess: (state, action) => {
      state.loading = false;
      state.reviewRemoved = true;
    },
    reviewReset: (state, loading) => {
      state.reviewPosted = false;
      state.reviewRemoved = false;
      state.reviewUpdated = false;
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
  reviewUpdateSuccess,
  reviewReset,
  reviewRemoveSuccess,
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

export const updateProductReview = (review) => async (dispatch) => {
  try {
    dispatch({
      type: reviewsRequest.type,
    });
    const { data } = await axios.patch(
      `/api/v1/reviews/${review?.reviewId}`,
      review
    );

    dispatch({
      type: reviewsRequestSuccess.type,
      payload: data?.reviews,
    });

    dispatch({
      type: reviewUpdateSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: reviewsRequestFail.type,
      payload: error.message,
    });
  }
};

export const removeProductReview = (reviewId) => async (dispatch) => {
  try {
    dispatch({
      type: reviewsRequest.type,
    });

    await axios.delete(`/api/v1/reviews/${reviewId}`);

    dispatch({
      type: reviewRemoveSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: reviewsRequestFail.type,
      payload: error.message,
    });
  }
};
