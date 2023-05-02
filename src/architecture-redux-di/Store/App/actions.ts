import { AppState } from "./state"

export function showLoadingIcon (state:AppState) {
  const newState = Object.assign({}, state)  
  newState.isLoading = true
  return newState
}

export function hideLoadingIcon (state:AppState) {
  const newState = Object.assign({}, state)  
  newState.isLoading = false
  return newState
}

export function showMessageModal (
  state:AppState,
  param: {
    title:string,
    message:string,
  }
) {
  const newState = Object.assign({}, state)  
  newState.messageModal = {
    isOpen: true,
    title: param.title,
    message: param.message,
  }
  return newState
}

export function hideMessageModal (
  state:AppState,
) {
  const newState = Object.assign({}, state)  
  newState.messageModal = {
    isOpen: false,
    title: '',
    message: '',
  }
  return newState
}

export function showConfirmationModal (
  state:AppState,
  param: {
    title:string,
    message:string,
    onExecute: () => void
  }
) {
  const newState = Object.assign({}, state)  
  newState.confirmationModal = {
    isOpen: true,
    title: param.title,
    message: param.message,
    onExecute: param.onExecute,
  }
  return newState
}

export function hideConfirmationModal (
  state:AppState,
) {
  const newState = Object.assign({}, state)  
  newState.confirmationModal = {
    isOpen: false,
    title: '',
    message: '',
    onExecute: null
  }
  return newState
}

export function showPopup (
  state:AppState,
  param: {
    text:string,
  }  
) {
  const newState = Object.assign({}, state)  
  newState.popup = {
    isOpen: true,
    text: param.text
  }
  return newState
}

export function hidePopup (
  state:AppState,
) {
  const newState = Object.assign({}, state)  
  newState.popup = {
    isOpen: false,
    text: ''
  }
  return newState
}