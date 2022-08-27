import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import projectReducer from './projectReducer';
import authReducer from './authReducer'

export default configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer,
    auth: authReducer
  }
})