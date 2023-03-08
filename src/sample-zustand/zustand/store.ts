import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { registerDevice, fetchDevices, updateDevice, deleteDevice } from "../../ApiRequest"
import { Device } from "../components/DeviceList"

type State = {
  deviceList: Device[],
  fetchDevices: (searchParam: { name?: string, model?: string }) => Promise<void>
  registerDevice: (name: string, model: string) => Promise<void>
  updateDevice: (id: string, param: { name?: string; model?: string; }) => Promise<void>
  deleteDevice: (id: string) => Promise<void>
}

const useStore = create<State>()(
  devtools(
    ((set) => ({
      deviceList: [],
      fetchDevices: async (searchParam: { name?: string, model?: string }) => {
        const response = await fetchDevices(searchParam);
        set({ deviceList: response.data })
      },
      registerDevice: async (name: string, model: string) => {
        await registerDevice(name, model)
        const response = await fetchDevices({})
        set({ deviceList: response.data })
      },
      updateDevice: async (id: string, param: { name?: string, model?: string}) => {
        await updateDevice(id, param)
        const response = await fetchDevices({})
        set({ deviceList: response.data })
      },
      deleteDevice: async (id: string) => {
        await deleteDevice(id)
        const response = await fetchDevices({})
        set({ deviceList: response.data })
      }
    }))
  )
);

export default useStore;
