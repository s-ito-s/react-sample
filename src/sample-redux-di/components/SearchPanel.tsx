// React
import { useSelector, useDispatch } from 'react-redux'

// Store
import { updateSearchParam, clearSearchParam, updateDeviceList } from '../store/actions'
import { selectDevicePageState, selectDeviceSearchParam } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

// Component
import './SearchPanel.css'

function SerachPanel () {
  const state = useSelector(selectDevicePageState)
  const searchParam = useSelector(selectDeviceSearchParam)
  const dispatch = useDispatch()

  const onChangeSearchNameParam = (name:string) => {
    const newState = updateSearchParam(state, {name})
    dispatch(updateState(newState))
  }

  const onChangeSearchModelParam = (model:string) => {
    const newState = updateSearchParam(state, {model})
    dispatch(updateState(newState))
  }

  const onClickSearchButton = async () => {
    const newState = await updateDeviceList(state, deviceService)
    dispatch(updateState(newState))
  }

  const onClickClearButton = async () => {
    const newState = await clearSearchParam(state, deviceService)
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