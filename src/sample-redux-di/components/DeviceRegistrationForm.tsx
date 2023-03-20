// React
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Store
import { registerDevice } from '../store/actions'
import { selectDevicePageState } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

// Component
import './DeviceRegistrationForm.css'

function DeviceRegistrationForm () {
  const state = useSelector(selectDevicePageState)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [model, setModel] = useState('') 

  const onClickRegistrationButton = async () => {
    const newState = await registerDevice(state, deviceService, {name, model})
    dispatch(updateState(newState))
    setName('')
    setModel('')
  }

  return (
    <div>
      <div className="device-registration-form-header">
        Registration
      </div>
      <div className="device-registration-form-row">
        <div>Name</div>
        <input 
          className="device-registration-form-row-input"
          value={name} 
          onChange={(e) => {setName(e.target.value)}}
        />
      </div>
      <div className="device-registration-form-row">
        <div>Model</div>
        <input 
          className="device-registration-form-row-input"
          value={model}
          onChange={(e) => {setModel(e.target.value)}}
        />
      </div>
      <div className="device-registration-button-area">
        <button onClick={onClickRegistrationButton}>Register</button>
      </div>
    </div>
  )
}

export default DeviceRegistrationForm