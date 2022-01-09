import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const slice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    loading: false,
    error: null,
  },
  reducers: {
    userRequest: (state, action) => {
      state.loading = true;
    },
    userRequestSuccess: (state, action) => {
      state.loading = false;
      state.userData = action.payload;
    },
    userRequestFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// Actions
const { userRequest, userRequestSuccess, userRequestFail } = slice.actions;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    });

    const { data } = await axios.post(`/api/v1/users/register`, userData);

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.message,
    });
  }
};
