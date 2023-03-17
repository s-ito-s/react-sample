// react
import { useSelector } from 'react-redux'

// Store
import { selectDeviceList } from '../store/selectors'

// Component
import DeviceListItemView from "./DeviceListItemView"
import DeviceListItemEditor from "./DeviceListItemEditor"
import './DeviceListItem.css'

type DeviceListItemProps = {
  id: string, 
}

function DeviceListItem( {id}: DeviceListItemProps ) {
  const deviceList = useSelector(selectDeviceList)
  const tragetDevice = deviceList.filter(device => {
    return device.id === id
  })[0]

  if (tragetDevice.isEdit) {
    return <DeviceListItemEditor id={id}/>
  }else {
    return <DeviceListItemView id={id}/>
  }
}

export default DeviceListItem