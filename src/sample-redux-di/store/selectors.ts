import type { RootState } from '../store'

export const selectDevicePageState = (state:RootState) => {
  return state.device
}

export const selectDeviceList = (state:RootState) => {
  return state.device.deviceList
}

export const selectDeviceSearchParam = (state:RootState) => {
  return state.device.searchParam
}