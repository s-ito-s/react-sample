// React
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { RootState } from 'architecture-redux-di/Slices/store'
import { 
  showMessage, 
  showLoading,
  hideLoading,
} from 'architecture-redux-di/Slices/App/slice'

// Device Page Store
import { updateState } from 'architecture-redux-di/Slices/Pages/DevicePage/slice'
import { registerDevice } from 'architecture-redux-di/Store/Pages/DevicePage/actions'

// Service
import deviceService from "architecture-redux-di/Service/deviceService"

// Component
import './DeviceRegistrationForm.css'

function DeviceRegistrationForm () {
  const devicePageState = useSelector((s:RootState) => s.devicePage)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [model, setModel] = useState('') 

  const onClickRegistrationButton = async () => {
    try {
      // ローディングアイコンを表示
      dispatch(showLoading())

      // 具体的な処理
      const newState = await registerDevice(devicePageState, deviceService, {name, model})
      dispatch(updateState(newState))
      setName('')
      setModel('')

      // 完了メッセージを表示      
      dispatch(showMessage({
        title: 'Device Page',
        message: 'device registered',
      }))
    } catch(error: any){
      // エラーメッセージを表示
      dispatch(showMessage({
        title: 'Device Page',
        message: error,
      }))          
    } finally {
      // ローディングアイコンを消す
      dispatch(hideLoading())
    }
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