import { configureStore } from '@reduxjs/toolkit'
import devicePageReducer from './sample-redux-di/store/devicePageSlice'

export const store = configureStore({
  reducer: {
    device: devicePageReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch