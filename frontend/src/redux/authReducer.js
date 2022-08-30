import { createSlice } from '@reduxjs/toolkit'

export const authReducer = createSlice({
  name: 'auth',
  initialState: {
    isAuth: false,
    auth: null,
    user: null
  },
  reducers: {
    login: (state, action) => {
      state.isAuth = true
      state.auth = action.payload
    },
    logout: (state) => {
      state.isAuth = false
      state.auth = null
      state.user = null
      localStorage.removeItem('token')
    },
    setUser: (state, action) => {
      state.user = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { login, logout, auth, setUser } = authReducer.actions

export default authReducer.reducer