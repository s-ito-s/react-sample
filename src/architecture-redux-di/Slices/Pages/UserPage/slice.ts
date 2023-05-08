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

    updateState2: (state, action: PayloadAction<{state:UserPageState, changedProperties: string[]}>) => {
      console.log('updateState2')
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

export const { updateState, updateState2 } = userPageSlice.actions

export default userPageSlice.reducer