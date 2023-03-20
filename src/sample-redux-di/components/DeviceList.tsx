// react
import { useSelector } from 'react-redux'

// Store
import { selectDeviceList } from '../store/selectors'

// Component
import DeviceListItem from './DeviceListItem'
import './DeviceList.css'

function DeviceList () {
  const deviceList = useSelector(selectDeviceList)

  return (
    <table>
      <thead>
        <tr>
          <th className="device-list-cell-name">Name</th>
          <th className="device-list-cell-model">Model</th>
          <th className="device-list-cell-button"></th>
        </tr>
      </thead>  
      <tbody>
        {deviceList.map((device) => {
          return (
            <DeviceListItem 
              key={device.id}
              id={device.id}
              name={device.name}
              model={device.model}
            />
          )}
        )}
      </tbody>
    </table>      
  )
}

export default DeviceList