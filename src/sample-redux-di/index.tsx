// react
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from "react-router-dom"

// Store
import { initialize } from './store/actions'
import { selectDevicePageState } from './store/selectors'
import { updateState } from './store/devicePageSlice'

// Service
import deviceService from "./Service/deviceService"

// Component
import SearchPanel from "./components/SearchPanel"
import DeviceList from "./components/DeviceList"
import DeviceRegistrationForm from "./components/DeviceRegistrationForm"
import './index.css'

function SampleReduxDI () {
  const state = useSelector(selectDevicePageState)
  const dispatch = useDispatch()

  useEffect(() => {
    (async ()=> {
      const newState = await initialize(state, deviceService)
      dispatch(updateState(newState))
    })()
  },[])

  return (
    <div className="sample-use-state-main">
      <h1>Sample UseState</h1>
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

export default SampleReduxDI