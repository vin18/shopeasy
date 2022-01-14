import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'admin',
  initialState: {
    adminUserData: [],
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
  },
});

export default slice.reducer;

// Actions
const { adminUserRequest, adminUserRequestSuccess, adminUserRequestFail } =
  slice.actions;

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
