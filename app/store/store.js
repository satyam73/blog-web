import { configureStore } from '@reduxjs/toolkit'
import globalReducer from '@/app/store/global'
export const store = configureStore({
  reducer: { global: globalReducer },
})
