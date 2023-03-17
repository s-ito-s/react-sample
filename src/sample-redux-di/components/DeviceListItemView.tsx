import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Store
import { updateDevice, cancelEditingDevice } from '../store/actions'
import { selectDeviceList } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

type DeviceListItemViewProps = {
  id: string, 
}

const DeviceListItemView = ( {id}: DeviceListItemViewProps) => {
  const deviceList = useSelector(selectDeviceList)
  const tragetDevice = deviceList.filter(device => {
    return device.id === id
  })[0]

  const onClickDeleteButton = () => {
  }

  const onClickEditButton = () => {
  }

  return (
    <tr key={id}>
      <td>{tragetDevice.name}</td>
      <td>{tragetDevice.model}</td>
      <td>
        <div className="device-list-item-button-area">
          <button onClick={onClickEditButton}>
            Edit
          </button>
          <button onClick={onClickDeleteButton}>
            Delete
          </button>          
        </div>
      </td>
    </tr>
  )
}

export default DeviceListItemView