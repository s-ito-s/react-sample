import { configureStore } from '@reduxjs/toolkit'
import appReducer from './App/slice'
import devicePageReducer from './Pages/DevicePage/slice'
import userPageReducer from './Pages/UserPage/slice'

export const storeArcReduxDi = configureStore({
  reducer: {
    app: appReducer,
    devicePage: devicePageReducer,
    userPage: userPageReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  },  
})

export type RootState = ReturnType<typeof storeArcReduxDi.getState>
export type AppDispatch = typeof storeArcReduxDi.dispatch