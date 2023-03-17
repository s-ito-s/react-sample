import { DevicePageState } from './state'
import { IDeviceService } from '../Service/deviceService'

export const initialize = async (
  state: DevicePageState,
  service: IDeviceService
) => {
  return await fetchDevices(state, service, {})
}

export const finalize = () => {
}

export const fetchDevices = async (
  state: DevicePageState,
  service: IDeviceService,
  searchParam: {name?:string, model?:string}
) : Promise<DevicePageState> => {
  const response = await service.fetchDevices(searchParam)
  const newState = Object.assign({}, state)
  newState.deviceList = response.data.map((device: any) => {
    return {
      id: device.id,
      name: device.name,
      model: device.model,
      isEdit: false,
    }
  })
  return newState
}

export const registerDevice = async (
  state: DevicePageState, 
  service: IDeviceService,
  name:string,
  model:string
) : Promise<DevicePageState> => {
  await service.registerDevice(name, model)
  return await fetchDevices(state, service, {})
}

export const startEditingDevice = (
  state: DevicePageState,
  id: string
) => {
  const newState = Object.assign({}, state)
}

export const cancelEditingDevice = (
  state: DevicePageState,
  id: string
) => {
  const newState = Object.assign({}, state)
}

export const updateDevice = async (
  state: DevicePageState,
  service: IDeviceService,
  id: string,
  param: {name?:string, model?:string}
) : Promise<DevicePageState> => {
  await service.updateDevice(id, param)
  return await fetchDevices(state, service, {})
}

export const deleteDevice = async (
  state: DevicePageState, 
  service: IDeviceService,
  id: string,
) : Promise<DevicePageState> => {
  await service.deleteDevice(id)
  return await fetchDevices(state, service, {})
}