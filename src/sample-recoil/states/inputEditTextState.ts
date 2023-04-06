import { atomFamily } from "recoil"

export const inputEditTextState = atomFamily<string, string>({
  key: "inputEditTextState",
  default: (param) => param,
})
