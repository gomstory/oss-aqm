import { configureStore } from '@reduxjs/toolkit';
import projectReducer from './projectReducer';
import authReducer from './authReducer'

export default configureStore({
  reducer: {
    project: projectReducer,
    auth: authReducer
  }
})