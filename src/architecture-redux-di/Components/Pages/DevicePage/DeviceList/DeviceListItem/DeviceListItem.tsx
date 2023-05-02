// React
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'
import { 
  showLoading,
  hideLoading,
  showMessage,
  showConfirmationMessage, 
} from 'architecture-redux-di/Slices/App/slice'

// Device Page Store
import { updateDevice, deleteDevice } from 'architecture-redux-di/Store/Pages/DevicePage/actions'
import { updateState } from 'architecture-redux-di/Slices/Pages/DevicePage/slice'

// Service
import deviceService from "architecture-redux-di/Service/deviceService"

// Component
import DeviceListItemView from "./DeviceListItemView/DeviceListItemView"
import DeviceListItemEditor from "./DeviceListItemEditor/DeviceListItemEditor"
import './DeviceListItem.css'

type DeviceListItemProps = {
  id: string, 
  name: string,
  model: string
}

function DeviceListItem( {id, name, model}: DeviceListItemProps ) {
  const devicePageState = useSelector((s:RootState) => s.devicePage)
  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false)

  const onEdit = () => {
    setIsEdit(true)
  }

  const onCancel = () => {
    setIsEdit(false)
  }  

  const onUpdate = async (id:string, name:string, model:string) => {
    try {
      // ローディングのクルクル表示
      dispatch(showLoading())

      // 更新処理
      const newState = await updateDevice(devicePageState, deviceService, {id, name, model})
      dispatch(updateState(newState))    
      setIsEdit(false)
      
      // 完了メッセージ
      dispatch(showMessage({
        title: 'Device Page',
        message: 'device updated',
      }))
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'Device Page',
        message: error,
      }))          
    } finally {
      // ローディングのクルクル非表示
      dispatch(hideLoading())
    }
  }

  const onDelete = async (id:string) => {
    dispatch(showConfirmationMessage({
      title: 'Device Page',
      message: 'Are you sure to delete device?',
      onExecute: () => {executeDeviceDeletion(id)}
    }))
  }

  const executeDeviceDeletion = async (id: string) => {
    try {
      // ローディングのクルクル表示
      dispatch(showLoading())

      // 更新処理
      const newState = await deleteDevice(devicePageState, deviceService, {id})
      dispatch(updateState(newState))        
      setIsEdit(false)  

      // 完了メッセージ
      dispatch(showMessage({
        title: 'Device Page',
        message: 'device deleted',
      }))
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'Device Page',
        message: error,
      }))          
    } finally {
      // ローディングのクルクル非表示
      dispatch(hideLoading())
    }
  }

  if (isEdit) {
    return <DeviceListItemEditor id={id} name={name} model={model} onCancel={onCancel} onUpdate={onUpdate}/>
  }else {
    return <DeviceListItemView id={id} name={name} model={model} onEdit={onEdit} onDelete={onDelete} />
  }
}

export default DeviceListItem