import { atom, selector } from "recoil"
import { fetchDevices } from "../../ApiRequest"

type Device = {
  id: string
  name: string
  model: string
}

export const devicesState = atom<Device[]>({
  key: "devicesState",
  default: selector({
    key: "fetchDevices",
    get: async () => {
      try {
        const { data } = await fetchDevices({})
        return data
      } catch (error) {
        console.error(error)
      }
    },
  }),
})
