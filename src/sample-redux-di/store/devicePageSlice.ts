import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { DevicePageState } from './state'

const initialState: DevicePageState = {
  deviceList: [],
}

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
  },
})

export const { updateState } = devicePageSlice.actions
export default devicePageSlice.reducer