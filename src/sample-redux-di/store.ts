import { configureStore } from '@reduxjs/toolkit'
import devicePageReducer from './store/devicePageSlice'

export const storeReduxDI = configureStore({
  reducer: {
    device: devicePageReducer
  },
})

export type RootState = ReturnType<typeof storeReduxDI.getState>
export type AppDispatch = typeof storeReduxDI.dispatch