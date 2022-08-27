import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    auth: null
  },
  reducers: {
    auth: state => {
      return state.isAuth
    },
    login: (state, action) => {
      state.isAuth = true
      state.auth = action.payload
    },
    logout: (state) => {
      state.isAuth = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, auth } = authReducer.actions

export default authReducer.reducer