import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'product',
  initialState: {
    productData: [],
    productDeleted: false,
    productUpdated: false,
    productCreated: false,
    productAdminData: null,
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
    productAdminUpdateSuccess: (state, action) => {
      state.loading = false;
      state.productAdminData = action.payload;
      state.productUpdated = true;
    },
    productAdminRequestSuccess: (state, action) => {
      state.loading = false;
      state.productAdminData = action.payload;
    },
    productAdminCreateSuccess: (state, action) => {
      state.loading = false;
      state.productCreated = true;
    },
    adminProductCreateReset: (state, action) => {
      state.loading = false;
      state.productCreated = false;
    },
    adminProductUpdateReset: (state, action) => {
      state.loading = false;
      state.productUpdated = false;
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
  productAdminCreateSuccess,
  adminProductDeleteReset,
  adminProductCreateReset,
  productAdminUpdateSuccess,
  productAdminRequestSuccess,
  adminProductUpdateReset,
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
      payload: error.response.data.msg,
    });
  }
};

export const fetchAdminProduct = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: productRequest.type,
    });
    const { data } = await axios.get(`/api/v1/products/${productId}`);

    dispatch({
      type: productAdminRequestSuccess.type,
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: productRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const createAdminProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: productRequest.type,
    });
    const { data } = await axios.post(`/api/v1/products/admin`, product);

    dispatch({
      type: productAdminCreateSuccess.type,
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: productRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const updateAdminProduct = (product) => async (dispatch) => {
  try {
    dispatch({
      type: productRequest.type,
    });
    const { data } = await axios.patch(
      `/api/v1/products/admin/${product._id}`,
      product
    );

    dispatch({
      type: productAdminUpdateSuccess.type,
      payload: data?.product,
    });
  } catch (error) {
    dispatch({
      type: productRequestFail.type,
      payload: error.response.data.msg,
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
      payload: error.response.data.msg,
    });
  }
};
