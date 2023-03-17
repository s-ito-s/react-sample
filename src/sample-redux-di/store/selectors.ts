import type { RootState } from '../../Store'

export const selectDevicePageState = (state:RootState) => {
  return state.device
}

export const selectDeviceList = (state:RootState) => {
  return state.device.deviceList
}