import DeviceListItem from "./DeviceListItem"
import { useRecoilValue } from "recoil"
import { devicesState } from "../states/devicesState"

import "./DeviceList.css"

const DeviceList = (): JSX.Element => {
  const devices = useRecoilValue(devicesState)

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
        {devices &&
          devices.map((device) => {
            return (
              <DeviceListItem
                key={device.id}
                id={device.id}
                name={device.name}
                model={device.model}
              />
            )
          })}
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
