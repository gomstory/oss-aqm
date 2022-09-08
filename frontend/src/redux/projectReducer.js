import { createSlice } from '@reduxjs/toolkit'

export const defaultWeight = {
  'license': 1,
  'maturity': 1,
  'security': 1,
  'document': 1,
  // 'popularity': 1,
  'contributor': 1,
  'testibility': 1,
  'reliability': 1,
  'code_quality': 1,
  'community_size': 1,
  'maintainability': 1,
  'development_lang': 1,
  'availavility_forum': 1,
  'professional_support': 1
}

export const projectReducer = createSlice({
  name: 'project',
  initialState: {
    weight: defaultWeight,
    value: []
  },
  reducers: {
    addProject: (state, action) => {
      const exists = state.value.find(x => x.id == action.payload.id)
      if (!exists) {
        state.value.push(action.payload)
      }
    },
    removeProject: (state, action) => {
      state.value = state.value
        .filter(proj => action.payload.id !== proj.id)
    },
    setWeight: (state, action) => {
      state.weight[action.payload.key] = action.payload.value
    }
  }
})

// Action creators are generated for each case reducer function
export const { addProject, removeProject, setWeight } = projectReducer.actions

export default projectReducer.reducer