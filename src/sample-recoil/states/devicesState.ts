import { atom, selector } from "recoil";
import { fetchDevices } from "../../ApiRequest";

type Device = {
  id: string;
  name: string;
  model: string;
};

export const devicesState = atom<Device[] | null>({
  key: "devicesState",
  default: selector({
    key: "fetchDevices",
    get: async () => {
      try {
        const response = await fetchDevices({});
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
  }),
});
