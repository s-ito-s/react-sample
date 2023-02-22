import "./DeviceRegistrationForm.css"
import {
  inputRegisterNameState,
  inputRegisterModelState,
} from "../states/inputRegisterFormState"
import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil"
import { registerDevice } from "../../ApiRequest"
import { devicesState } from "../states/devicesState"

function DeviceRegistrationForm() {
  const refreshDevicesState = useRecoilRefresher_UNSTABLE(devicesState)

  const [name, setName] = useRecoilState(inputRegisterNameState)
  const [model, setModel] = useRecoilState(inputRegisterModelState)

  const onClickRegistrationButton = async () => {
    await registerDevice(name, model)
    refreshDevicesState()
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
