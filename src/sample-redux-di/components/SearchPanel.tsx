// React
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Store
import { fetchDevices } from '../store/actions'
import { selectDevicePageState } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

// Component
import './SearchPanel.css'

function SerachPanel () {
  const state = useSelector(selectDevicePageState)
  const dispatch = useDispatch()

  const [name, setName] = useState('')
  const [model, setModel] = useState('') 

  const onClickSearchButton = async () => {
    const param: {name?: string, model?:string} = {}
    if (name !== '') {
      param['name'] = name
    }
    if (model !== '') {
      param['model'] = model
    }
    const newState = await fetchDevices(state, deviceService, param)
    dispatch(updateState(newState))
  }

  const onClickClearButton = async () => {
    setName('')
    setModel('')
    const newState = await fetchDevices(state, deviceService, {})
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
          value={name} 
          onChange={(e) => {setName(e.target.value)}}
        />
      </div>
      <div className="search-panel-row">
        <div className="search-panel-row-label">Model</div>
        <input 
          className="search-panel-row-input" 
          value={model}  
          onChange={(e) => {setModel(e.target.value)}}
        />
      </div>
    </div>
  )
}

export default SerachPanel