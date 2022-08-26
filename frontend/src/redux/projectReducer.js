import { createSlice } from '@reduxjs/toolkit'

export const projectReducer = createSlice({
  name: 'project',
  initialState: {
    value: []
  },
  reducers: {
    addProject: (state, action) => {
      state.value.push(action.payload)
    },
    removeProject: (state, action) => {
      state.value = state.value
        .filter(proj => action.payload.id === proj.id)
    }
  }
})

// Action creators are generated for each case reducer function
export const { addProject, removeProject } = projectReducer.actions

export default projectReducer.reducer