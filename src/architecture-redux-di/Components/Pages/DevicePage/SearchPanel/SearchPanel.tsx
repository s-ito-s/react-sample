// React
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { RootState } from 'architecture-redux-di/Slices/store'

// Device Page Store
import { updateSearchParam, clearSearchParam, updateDeviceList } from 'architecture-redux-di/Store/Pages/DevicePage/actions'
import { updateState } from 'architecture-redux-di/Slices/Pages/DevicePage/slice'

// Service
import deviceService from "architecture-redux-di/Service/deviceService"

// Component
import './SearchPanel.css'

function SerachPanel () {
  const devicePageState = useSelector((s:RootState) => s.devicePage)
  const searchParam = devicePageState.searchParam
  const dispatch = useDispatch()

  const onChangeSearchNameParam = (name:string) => {
    const newState = updateSearchParam(devicePageState, {name})
    dispatch(updateState(newState))
  }

  const onChangeSearchModelParam = (model:string) => {
    const newState = updateSearchParam(devicePageState, {model})
    dispatch(updateState(newState))
  }

  const onClickSearchButton = async () => {
    const newState = await updateDeviceList(devicePageState, deviceService)
    dispatch(updateState(newState))
  }

  const onClickClearButton = async () => {
    const newState = await clearSearchParam(devicePageState, deviceService)
    dispatch(updateState(newState))
  }  

  return (
    <div className="search-panel-main">
      <div className="search-panel-header">
        <div className="search-panel-header-label">Search</div>
        <div>
          <button onClick={onClickSearchButton}>Search</button>
          <button onClick={onClickClearButton}>Clear</button>
        </div>
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Name</div>
        <input 
          className="search-panel-row-input" 
          value={searchParam.name} 
          onChange={(e) => {onChangeSearchNameParam(e.target.value)}}
        />
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Model</div>
        <input 
          className="search-panel-row-input" 
          value={searchParam.model}  
          onChange={(e) => {onChangeSearchModelParam(e.target.value)}}
        />
      </div>
    </div>
  )
}

export default SerachPanel