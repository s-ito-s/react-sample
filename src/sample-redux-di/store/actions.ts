import { DevicePageState } from './state'
import { IDeviceService } from '../Service/deviceService'

export const initialize = async (
  state: DevicePageState,
  service: IDeviceService
) => {
  return await updateDeviceList(state, service)
}

export const finalize = () => {
}

export const updateSearchParam = (
  state: DevicePageState,
  param: {name?:string, model?:string}
) : DevicePageState => {
  const newState = Object.assign({}, state)
  const newSearchParam = Object.assign({}, state.searchParam)
  if(param.name !== undefined) {
    newSearchParam.name = param.name
  }
  if(param.model !== undefined) {
    newSearchParam.model = param.model
  }
  newState.searchParam = newSearchParam
  return newState
}

export const updateDeviceList = async (
  state: DevicePageState,
  service: IDeviceService,
) : Promise<DevicePageState> => {
  return await fetchDevices(state, service, state.searchParam)
}

export const clearSearchParam = async (
  state: DevicePageState,
  service: IDeviceService,  
) : Promise<DevicePageState> => {
  const newSearchParam = {
    name: '',
    model: '',
  }
  const newState = await fetchDevices(state, service, newSearchParam)
  newState.searchParam = newSearchParam
  return newState
}

export const registerDevice = async (
  state: DevicePageState, 
  service: IDeviceService,
  param: {name:string, model:string}
) : Promise<DevicePageState> => {
  await service.registerDevice(param.name, param.model)
  return await updateDeviceList(state, service)
}

export const updateDevice = async (
  state: DevicePageState,
  service: IDeviceService,
  param: {id: string,name?:string, model?:string}
) : Promise<DevicePageState> => {
  await service.updateDevice(param.id, param)
  return await updateDeviceList(state, service)
}

export const deleteDevice = async (
  state: DevicePageState, 
  service: IDeviceService,
  param: {id: string}
) : Promise<DevicePageState> => {
  await service.deleteDevice(param.id)
  return await updateDeviceList(state, service)
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
    }
  })
  return newState
}