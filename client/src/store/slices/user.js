import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
  name: 'user',
  initialState: {
    userData: [],
    isUserUpdated: false,
    loading: false,
    error: null,
    passwordForgotRequestSuccess: null,
    passwordResetRequestSuccess: null,
  },
  reducers: {
    userRequest: (state, action) => {
      state.loading = true
    },
    userRequestSuccess: (state, action) => {
      state.loading = false
      state.userData = action.payload
    },
    userUpdateSuccess: (state, action) => {
      state.isUserUpdated = true
    },
    userRequestFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
    userReset: (state, action) => {
      state.error = null
      state.isUserUpdated = false
    },
    userPassworForgotReceived: (state, action) => {
      state.loading = false
      state.passwordForgotRequestSuccess = action.payload
    },
    userPasswordResetReceived: (state, action) => {
      state.loading = false
      state.passwordResetRequestSuccess = action.payload
    },
    userPasswordRequestReset: (state, action) => {
      state.passwordForgotRequestSuccess = null
      state.passwordResetRequestSuccess = null
    },
  },
})

export default slice.reducer

// Actions
export const {
  userRequest,
  userRequestSuccess,
  userUpdateSuccess,
  userRequestFail,
  userReset,
  userPassworForgotReceived,
  userPasswordResetReceived,
  userPasswordRequestReset,
} = slice.actions

export const register = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    const { data } = await axios.post(`/api/v1/users/register`, userData)

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}

export const login = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    const { data } = await axios.post(`/api/v1/users/login`, userData)

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    await axios.get(`/api/v1/users/logout`)

    dispatch({
      type: userRequestSuccess.type,
      payload: null,
    })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}

export const forgotPassword = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    const { data } = await axios.post(`/api/v1/users/forgot-password`, userData)

    dispatch({
      type: userPassworForgotReceived.type,
      payload: data?.message,
    })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}

export const resetPassword =
  (resetPasswordToken, userData) => async (dispatch, getState) => {
    try {
      dispatch({
        type: userRequest.type,
      })

      const { data } = await axios.patch(
        `/api/v1/users/reset-password/${resetPasswordToken}`,
        userData
      )

      dispatch({
        type: userPasswordResetReceived.type,
        payload: data?.message,
      })
    } catch (error) {
      dispatch({
        type: userRequestFail.type,
        payload: error.response.data.msg,
      })
    }
  }

export const getMe = () => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    const { data } = await axios.get(`/api/v1/users/me`)

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: null,
    })
  }
}

export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({
      type: userRequest.type,
    })

    const { data } = await axios.patch(`/api/v1/users/profile`, userData)

    dispatch({
      type: userRequestSuccess.type,
      payload: data?.user,
    })

    dispatch({ type: userUpdateSuccess.type })
  } catch (error) {
    dispatch({
      type: userRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}
