import { registerDevice, fetchDevices, updateDevice, deleteDevice } from "ApiRequest"

export interface IDeviceService {
  registerDevice: (name: string, model: string) => any
  
  fetchDevices: ( searchParam: {
    name?: string
    model?: string
  }) => any

  updateDevice: (  id: string,
    updateParam: {
      name?: string
      model?: string
    }) => any
  
  deleteDevice: (id: string) => any
}

export class DeviceService implements IDeviceService {

  async registerDevice (name: string, model: string) {
    return await registerDevice(name, model)
  }
  
  async fetchDevices ( searchParam: {
    name?: string
    model?: string
  }){
    return await fetchDevices(searchParam)
  }

  async updateDevice (  
    id: string,
    updateParam: {
      name?: string
      model?: string
    }
  ){
    return await updateDevice(id, updateParam)
  }
  
  async deleteDevice (id: string) {
    return await deleteDevice(id)
  }
}

const deviceService = new DeviceService()
export default deviceService