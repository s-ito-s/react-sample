import { atom } from "recoil"

export const inputSearchNameState = atom<string>({
  key: "inputSearchNameState",
  default: "",
})

export const inputSearchModelState = atom<string>({
  key: "inputSearchModelState",
  default: "",
})
