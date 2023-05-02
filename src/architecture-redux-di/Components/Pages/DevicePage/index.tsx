// React
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

// Redux
import { RootState } from 'architecture-redux-di/Slices/store'

// Device Page Store
import { initialize } from 'architecture-redux-di/Store/Pages/DevicePage/actions'
import { updateState } from 'architecture-redux-di/Slices/Pages/DevicePage/slice'

// Service
import deviceService from "architecture-redux-di/Service/deviceService"

// Component
import SearchPanel from "./SearchPanel/SearchPanel"
import DeviceList from "./DeviceList/DeviceList"
import DeviceRegistrationForm from "./DeviceRegistrationForm/DeviceRegistrationForm"

// CSS
import './index.css'

function DevicePage () {
  const devicePageState = useSelector((s:RootState) => s.devicePage)
  const dispatch = useDispatch()

  useEffect(() => {
    (async ()=> {
      const newState = await initialize(devicePageState, deviceService)
      dispatch(updateState(newState))
    })()
  },[])

  return (
    <div className="sample-use-state-main">
      <div className="search-panel">
        <SearchPanel/>
      </div>
      <div className="device-list">
        <DeviceList/>
      </div>
      <div className="device-registration-form">
        <DeviceRegistrationForm/>
      </div>
      <div>
        <Link to={`/`}>Back</Link> 
      </div>     
    </div>
  )
}

export default DevicePage