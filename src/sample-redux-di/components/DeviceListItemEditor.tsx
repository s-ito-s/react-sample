// react
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Store
import { updateDevice, cancelEditingDevice } from '../store/actions'
import { selectDeviceList } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

// Component
import './DeviceListItem.css'

type DevictListItemEditorProps = {
  id: string,
}

const DeviceListItemEditor = ({id}: DevictListItemEditorProps) => {
  const deviceList = useSelector(selectDeviceList)
  const tragetDevice = deviceList.filter(device => {
    return device.id === id
  })[0]

  const [newName, setNewName] = useState(tragetDevice.name)
  const [newModel, setNewModel] = useState(tragetDevice.model) 

  const onClickCancelButton = () => {
  }

  const onClickUpdateButton = () => {
  }

  return (
    <tr key={id}>
      <td>
        <input 
          className="device-list-item-input"
          value={newName}
          onChange={(e)=>{setNewName(e.target.value)}}
        />
      </td>
      <td>
        <input 
          className="device-list-item-input"
          value={newModel}
          onChange={(e)=>{setNewModel(e.target.value)}}
        />
      </td>
      <td>
        <div className="device-list-item-button-area">          
          <button onClick={onClickCancelButton}>
            cancel
          </button>
          <button onClick={onClickUpdateButton}>
            update
          </button>
        </div>
      </td>
    </tr>
  )
}

export default DeviceListItemEditor