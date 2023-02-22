import {
  inputRegisterNameState,
  inputRegisterModelState,
} from "../states/inputRegisterFormState"
import { useRecoilState, useSetRecoilState } from "recoil"
import { registerDevice } from "../../ApiRequest"
import { devicesState } from "../states/devicesState"
import { fetchDevices } from "../../ApiRequest"
import "./DeviceRegistrationForm.css"

function DeviceRegistrationForm() {
  const setDevicesState = useSetRecoilState(devicesState)

  const [name, setName] = useRecoilState(inputRegisterNameState)
  const [model, setModel] = useRecoilState(inputRegisterModelState)

  const onClickRegistrationButton = async () => {
    await registerDevice(name, model)

    const { data } = await fetchDevices({})
    setDevicesState(data)

    setName("")
    setModel("")
  }

  return (
    <div>
      <div className="device-registration-form-header">Registration</div>
      <div className="device-registration-form-row">
        <div>Name</div>
        <input
          className="device-registration-form-row-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="device-registration-form-row">
        <div>Model</div>
        <input
          className="device-registration-form-row-input"
          value={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </div>
      <div className="device-registration-button-area">
        <button onClick={onClickRegistrationButton}>Register</button>
      </div>
    </div>
  )
}

export default DeviceRegistrationForm
