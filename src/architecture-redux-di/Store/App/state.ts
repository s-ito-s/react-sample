export type MessageModalState = {
  isOpen: boolean
  title: string
  message: string
}

export type ConfirmationModalState = {
  isOpen: boolean
  title: string
  message: string
  onExecute: (() => void) | null
}

export type ErrorModalState = {
  isOpen: boolean
  title: string
  message: string
}

export type PopupState = {
  isOpen: boolean
  text: string
}

export type AppState = {
  isLoading: boolean
  messageModal: MessageModalState
  confirmationModal: ConfirmationModalState
  errorModal : ErrorModalState
  popup: PopupState
}

export function getInitialAppState(): AppState {
  return {
    isLoading: false,
    messageModal: {
      isOpen: false,
      title: '',
      message: '',
    },
    confirmationModal: {
      isOpen: false,
      title: '',
      message: '',
      onExecute: null,
    },
    errorModal: {
      isOpen: false,
      title: '',
      message: '',
    },
    popup: {
      isOpen: false,
      text: ''
    }
  }  
}
