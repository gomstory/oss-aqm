import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice'
import projectReducer from './projectReducer';

export default configureStore({
  reducer: {
    counter: counterReducer,
    project: projectReducer
  }
})