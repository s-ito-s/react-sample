import { atom } from "recoil"

export const inputRegisterNameState = atom<string>({
  key: "inputRegisterNameState",
  default: "",
})

export const inputRegisterModelState = atom<string>({
  key: "inputRegisterModelState",
  default: "",
})
