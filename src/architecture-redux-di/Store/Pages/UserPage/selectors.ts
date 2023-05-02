import type { UserPageState } from './state'

export const selectUserPageState = (state:UserPageState) => {
  return state
}

export const isAllUserChecked = (state:UserPageState) => {
  if (state.userList.length === 0) {
    return false
  }
  return state.userList.every(user => user.checked)
}

export const isDeleteButtonDisable = (state:UserPageState) => {
  return !state.userList.some(user => user.checked)
}