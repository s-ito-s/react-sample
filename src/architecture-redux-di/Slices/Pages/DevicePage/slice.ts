import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { 
  DevicePageState,
  getInitialDevicePageState,
} from 'architecture-redux-di/Store/Pages/DevicePage/state'

const initialState: DevicePageState = getInitialDevicePageState()

export const devicePageSlice = createSlice({
  name: 'devicePage',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<DevicePageState>) => {
      for (const key in state) {
        if (key in action.payload) {
          /* @ts-ignore */
          state[key] = action.payload[key]
        }
      }
    },

    updateState2: (state, action: PayloadAction<{state:DevicePageState, changedProperties: string[]}>) => {
      const newState = action.payload.state
      const changedProperties = action.payload.changedProperties
      for (const property of changedProperties){
        if (property in state && property in newState) {
          /* @ts-ignore */
          state[property] = newState[property]
        }
      }
    },       
  },
})

export const { updateState, updateState2 } = devicePageSlice.actions

export default devicePageSlice.reducer