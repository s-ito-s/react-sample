// react
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// Store
import { updateDevice, deleteDevice } from '../store/actions'
import { selectDevicePageState } from '../store/selectors'
import { updateState } from '../store/devicePageSlice'

// Service
import deviceService from "../Service/deviceService"

// Component
import DeviceListItemView from "./DeviceListItemView"
import DeviceListItemEditor from "./DeviceListItemEditor"
import './DeviceListItem.css'

type DeviceListItemProps = {
  id: string, 
  name: string,
  model: string
}

function DeviceListItem( {id, name, model}: DeviceListItemProps ) {
  const state = useSelector(selectDevicePageState)
  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false)

  const onEdit = () => {
    setIsEdit(true)
  }

  const onCancel = () => {
    setIsEdit(false)
  }  

  const onUpdate = async (id:string, name:string, model:string) => {
    const newState = await updateDevice(state, deviceService, {id, name, model})
    dispatch(updateState(newState))    
    setIsEdit(false)
  }

  const onDelete = async (id:string) => {
    const newState = await deleteDevice(state, deviceService, {id})
    dispatch(updateState(newState))        
    setIsEdit(false)    
  }  

  if (isEdit) {
    return <DeviceListItemEditor id={id} name={name} model={model} onCancel={onCancel} onUpdate={onUpdate}/>
  }else {
    return <DeviceListItemView id={id} name={name} model={model} onEdit={onEdit} onDelete={onDelete} />
  }
}

export default DeviceListItem