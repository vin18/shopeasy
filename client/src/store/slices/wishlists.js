import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const slice = createSlice({
  name: 'wishlists',
  initialState: {
    wishlistsData: [],
    loading: false,
    isBookmarkUpdated: false,
    error: null,
  },
  reducers: {
    wishlistsRequest: (state, action) => {
      state.loading = true
    },
    wishlistsRequestSuccess: (state, action) => {
      state.loading = false
      state.wishlistsData = action.payload
    },
    wishlistsUpdateRequest: (state, action) => {
      state.isBookmarkUpdated = true
    },
    wishlistsReset: (state, action) => {
      state.isBookmarkUpdated = false
      state.error = null
    },
    wishlistsRequestFail: (state, action) => {
      state.loading = false
      state.error = action.payload
    },
  },
})

export default slice.reducer

// Actions
export const {
  wishlistsRequest,
  wishlistsRequestSuccess,
  wishlistsRequestFail,
  wishlistsUpdateRequest,
  wishlistsReset,
} = slice.actions

export const createUpdateWishlist = (productId) => async (dispatch) => {
  try {
    dispatch({
      type: wishlistsRequest.type,
    })

    const { data } = await axios.post(`/api/v1/bookmarks/${productId}`)

    dispatch({
      type: wishlistsUpdateRequest.type,
    })
  } catch (error) {
    dispatch({
      type: wishlistsRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}

export const fetchWishlistedProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: wishlistsRequest.type,
    })

    const { data } = await axios.get(`/api/v1/bookmarks`)

    dispatch({
      type: wishlistsRequestSuccess.type,
      payload: data?.products,
    })
  } catch (error) {
    dispatch({
      type: wishlistsRequestFail.type,
      payload: error.response.data.msg,
    })
  }
}
