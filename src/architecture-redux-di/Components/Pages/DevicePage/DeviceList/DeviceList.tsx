// React
import { useSelector } from 'react-redux'

// Redux
import { RootState } from 'architecture-redux-di/Slices/store'

// Component
import DeviceListItem from './DeviceListItem/DeviceListItem'
import './DeviceList.css'

function DeviceList () {
  const devicePageState = useSelector((s:RootState) => s.devicePage)
  const deviceList = devicePageState.deviceList

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