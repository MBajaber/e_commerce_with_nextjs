import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  toggleNav: false,
  user: null,
  pageInfo: ''
}

export const counterSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    navToggle: (state, action) => {
      if(action.payload === undefined) {
        return {...state, toggleNav: !state.toggleNav }
      } else {
        return {...state, toggleNav: action.payload }
      }
    },
    getUser: (state, action) => {
      return { ...state, user: action.payload }
    },
    logOutUser: (state) => {
      return { ...state, user: null }
    },
    pageInfo: (state, action) => {
      return { ...state, pageInfo: action.payload }
    },
  },
})

export const { navToggle, getUser, logOutUser, pageInfo } = counterSlice.actions

export default counterSlice.reducer