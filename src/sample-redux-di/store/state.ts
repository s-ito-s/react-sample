export type Device = {
  id: string, 
  name: string, 
  model: string,
  isEdit: boolean,
}

export type DevicePageState = {
  deviceList: Device[]
}