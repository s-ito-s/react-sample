// Redux
import { createSlice } from '@reduxjs/toolkit'
import { PayloadAction } from '@reduxjs/toolkit'

// State
import { 
  AppState,
  getInitialAppState,
} from 'architecture-redux-di/Store/App/state'

// Action
import { 
  showLoadingIcon,
  hideLoadingIcon,
  showMessageModal, 
  hideMessageModal,
  showConfirmationModal,
  hideConfirmationModal,
  showPopup,
  hidePopup,
} from 'architecture-redux-di/Store/App/actions'

const initialState: AppState = getInitialAppState()

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    showLoading: (state) => {
      const newState = showLoadingIcon(state)
      state.isLoading = newState.isLoading
    },
    hideLoading: (state) => {
      const newState = hideLoadingIcon(state)
      state.isLoading = newState.isLoading
    },     
    showMessage: (state, action: PayloadAction<{title:string, message:string}>) => {
      const newState = showMessageModal(state, action.payload)
      state.messageModal = newState.messageModal
    },
    hideMessage: (state) => {
      const newState = hideMessageModal(state)
      state.messageModal = newState.messageModal
    },
    showConfirmationMessage: (state, action: PayloadAction<{title:string, message:string, onExecute: () => void}>) => {
      const newState = showConfirmationModal(state, action.payload)
      state.confirmationModal = newState.confirmationModal
    },
    hideConfirmationMessage: (state) => {
      const newState = hideConfirmationModal(state)
      state.confirmationModal = newState.confirmationModal
    }, 
    showPopupMessage: (state, action: PayloadAction<{text:string}>) => {
      const newState = showPopup(state, action.payload)
      state.popup = newState.popup
    },
    hidePopupMessage: (state) => {
      const newState = hidePopup(state)
      state.popup = newState.popup
    }
  },
})

export const { 
  showLoading,
  hideLoading,
  showMessage,
  hideMessage,
  showConfirmationMessage,
  hideConfirmationMessage,
  showPopupMessage,
  hidePopupMessage,
} = appSlice.actions

export default appSlice.reducer