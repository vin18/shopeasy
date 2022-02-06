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
    clearError: (state, action) => {
      state.error = null;
    },
  },
});

export default slice.reducer;

// Actions
export const { userRequest, userRequestSuccess, userRequestFail, clearError } =
  slice.actions;

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
      payload: error.response.data.msg,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    });

    const { data } = await axios.post(`/api/v1/users/login`, userData);

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    });

    await axios.get(`/api/v1/users/logout`);

    dispatch({
      type: userRequestSuccess.type,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};

export const getMe = () => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    });

    const { data } = await axios.get(`/api/v1/users/me`);

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: null,
    });
  }
};

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    });

    const { data } = await axios.patch(`/api/v1/users/profile`, userData);

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    });
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    });
  }
};
