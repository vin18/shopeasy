import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'admin',
  initialState: {
    adminUserData: [],
    userDeleted: false,
    loading: false,
    error: null,
  },
  reducers: {
    adminUserRequest: (state, action) => {
      state.loading = true;
    },
    adminUserRequestSuccess: (state, action) => {
      state.loading = false;
      state.adminUserData = action.payload;
    },
    adminUserRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminUserDeleteSuccess: (state, action) => {
      state.loading = false;
      state.userDeleted = true;
    },
    adminUserDeleteReset: (state, action) => {
      state.userDeleted = false;
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
      payload: error.message,
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
      payload: error.message,
    });
  }
};
