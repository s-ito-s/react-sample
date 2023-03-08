import DeviceListItem from './DeviceListItem'
import './DeviceList.css'

export type Device = {
  id:string, 
  name:string, 
  model:string 
}

type DeviceListProps = {
  deviceList: Device[], 
  onDelete: (id:string) => void
  onUpdate: (id:string, param:{name?:string, model?:string}) => void
}

function DeviceList ({deviceList, onDelete, onUpdate}: DeviceListProps) {

  const DeviceListHeader = () => {
    return (
      <thead>
        <tr>
          <th className="device-list-cell-name">Name</th>
          <th className="device-list-cell-model">Model</th>
          <th className="device-list-cell-button"></th>
        </tr>
      </thead>      
    )
  }

  const DeviceListBody = () => {
    return (
      <tbody>
      {
        deviceList.map((device) => {
          return (
            <DeviceListItem 
              key={device.id}
              id={device.id}
              name={device.name}
              model={device.model}
              onDelete={onDelete}
              onUpdate={onUpdate}
            />
          )}
        )
      }
      </tbody>
    )
  }

  return (
    <table>
      <DeviceListHeader />
      <DeviceListBody />
    </table>      
  )
}

export default DeviceList
