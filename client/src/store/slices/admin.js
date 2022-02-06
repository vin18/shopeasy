import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'admin',
  initialState: {
    adminUserData: [],
    adminUser: null,
    userDeleted: false,
    userUpdated: false,
    loading: false,
    error: null,
    adminOrders: [],
  },
  reducers: {
    adminUserRequest: (state, action) => {
      state.loading = true;
    },
    adminOrdersRequest: (state, action) => {
      state.loading = true;
    },
    adminUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.adminUserData = action.payload;
    },
    adminOrdersRequestSuccess: (state, action) => {
      state.loading = false;
      state.adminOrders = action.payload;
    },
    adminSingleUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.adminUser = action.payload;
    },
    adminUserRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminOrdersRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminUserDeleteSuccess: (state, action) => {
      state.loading = false;
      state.userDeleted = true;
    },
    adminUserUpdateSuccess: (state, action) => {
      state.loading = false;
      state.userUpdated = true;
    },
    adminUserDeleteReset: (state, action) => {
      state.userDeleted = false;
    },
    adminUserUpdateReset: (state, action) => {
      state.userUpdated = false;
    },
  },
});

export default slice.reducer;

// Actions
export const {
  adminUserRequest,
  adminUserRequestSuccess,
  adminUserRequestFail,
  adminUserDeleteSuccess,
  adminUserDeleteReset,
  adminUserUpdateSuccess,
  adminUserUpdateReset,
  adminSingleUserRequestSuccess,
  adminOrdersRequest,
  adminOrdersRequestSuccess,
  adminOrdersRequestFail,
} = slice.actions;

export const getAdminUsers = () => async (dispatch) => {
  try {
    dispatch({
      type: adminUserRequest.type,
    });

    const { data } = await axios.get(`/api/v1/users/admin`);

    dispatch({
      type: adminUserRequestSuccess.type,
      payload: data?.users,
    });
  } catch (error) {
    dispatch({
      type: adminUserRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const getAdminUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: adminUserRequest.type,
    });

    const { data } = await axios.get(`/api/v1/users/admin/${userId}`);

    dispatch({
      type: adminSingleUserRequestSuccess.type,
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: adminUserRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const updateAdminUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: adminUserRequest.type,
    });

    await axios.patch(`/api/v1/users/admin/${user._id}`, user);

    dispatch({
      type: adminUserUpdateSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: adminUserRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const deleteAdminUser = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: adminUserRequest.type,
    });

    await axios.delete(`/api/v1/users/admin/${userId}`);

    dispatch({
      type: adminUserDeleteSuccess.type,
    });
  } catch (error) {
    dispatch({
      type: adminUserRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const getAdminOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: adminOrdersRequest.type,
    });

    const { data } = await axios.get(`/api/v1/orders/admin/get-orders`);

    dispatch({
      type: adminOrdersRequestSuccess.type,
      payload: data?.orders,
    });
  } catch (error) {
    dispatch({
      type: adminOrdersRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};
