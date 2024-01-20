import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoginModalOpen: false,
  isRegisterModalOpen: false,
  isUnauthorizeModalOpen: false,
  isProfileModalOpen: false,

}

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    handleLoginModalChange: (state, action) => {
      state.isLoginModalOpen = action.payload;
    },
    handleRegisterModalChange: (state, action) => {
      state.isRegisterModalOpen = action.payload;
    },
    handleUnauthorizeModalChange: (state, action) => {
      state.isUnauthorizeModalOpen = action.payload;
    },
    handleProfileModalChange: (state, action) => {
      state.isProfileModalOpen = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { handleLoginModalChange, handleRegisterModalChange, handleUnauthorizeModalChange, handleProfileModalChange } = globalSlice.actions

export default globalSlice.reducer