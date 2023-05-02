import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

import { 
  UserPageState,
  getInitialUserPageState,
} from 'architecture-redux-di/Store/Pages/UserPage/state'

const initialState: UserPageState = getInitialUserPageState()

export const userPageSlice = createSlice({
  name: 'UserPage',
  initialState,
  reducers: {
    updateState: (state, action: PayloadAction<UserPageState>) => {
      for (const key in state) {
        if (key in action.payload) {
          /* @ts-ignore */
          state[key] = action.payload[key]
        }
      }
    },
  },
})

export const { updateState } = userPageSlice.actions

export default userPageSlice.reducer