import type { AppState } from './state'

export const selectMessageModalState = (state:AppState) => {
  return state.messageModal
}

export const selectErrorModalState = (state:AppState) => {
  return state.errorModal
}

export const isLoading = (state:AppState) => {
  return state.isLoading
}
