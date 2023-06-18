import { createSlice } from '@reduxjs/toolkit'

export const metricWeight = [
  'license_type', 
  'popularity_rating_score', 
  'project_size', 
  'community_size', 
  'availavility_forum', 
  'support_contributor', 
  'professional_support', 
  'maturity', 
  'development_lang_popularity', 
  'document', 
  'learning_material', 
  'cost', 
  'new_feature', 
  'continuing_change', 
  'code_quality', 
  'reliability', 
  'maintainability', 
  'security', 
  'testibility', 
  'co_existence', 
  'performance'
]

export const generateKeyValue = (keys = []) => {
  const obj = {}

  for (let key of keys) {
    obj[key] = { 
      weight: 1,
      disabled: false
    }
  }

  return obj
}

export const defaultWeight = generateKeyValue(metricWeight)

export const projectReducer = createSlice({
  name: 'project',
  initialState: {
    weight: defaultWeight,
    value: []
  },
  reducers: {
    addProject: (state, action) => {
      const exists = state.value.find(x => x.id === action.payload.id)
      if (!exists) {
        state.value.push(action.payload)
      }
    },
    removeProject: (state, action) => {
      state.value = state.value
        .filter(proj => action.payload.id !== proj.id)
    },
    setWeight: (state, action) => {
      state.weight[action.payload.key] = {
        weight: action.payload.weight,
        disabled: action.payload.disabled
      }
    }
  }
})

// Action creators are generated for each case reducer function
export const { addProject, removeProject, setWeight } = projectReducer.actions

export default projectReducer.reducer