import { useState } from "react"
import { useRecoilState, useRecoilRefresher_UNSTABLE } from "recoil"
import { devicesState } from "../states/devicesState"
import { inputEditTextState } from "../states/inputEditTextState"
import { updateDevice, deleteDevice } from "../../ApiRequest"
import "./DeviceListItem.css"

type DeviceListItemProps = {
  id: string
  name: string
  model: string
}

type DeviceListEditorProps = {
  initialName: string
  initialModel: string
}

const DeviceListItem = ({
  id,
  name,
  model,
}: DeviceListItemProps): JSX.Element => {
  // データを再取得するためのhooks
  const refreshDevicesState = useRecoilRefresher_UNSTABLE(devicesState)

  const [isEditMode, setIsEditMode] = useState(false)

  const onClickDeleteButton = () => {
    setIsEditMode(false)
    deleteDevice(id)
    refreshDevicesState()
  }

  const DeviceListItemView = () => {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{model}</td>
        <td>
          <div className="device-list-item-button-area">
            <button onClick={() => setIsEditMode(true)}>Edit</button>
            <button onClick={onClickDeleteButton}>Delete</button>
          </div>
        </td>
      </tr>
    )
  }

  const DeviceListItemEditor = ({
    initialName,
    initialModel,
  }: DeviceListEditorProps): JSX.Element => {
    const [newName, setNewName] = useRecoilState(
      inputEditTextState(initialName)
    )
    const [newModel, setNewModel] = useRecoilState(
      inputEditTextState(initialModel)
    )

    const onClickUpdateButton = () => {
      updateDevice(id, { name: newName, model: newModel })
      refreshDevicesState()
    }

    return (
      <tr key={id}>
        <td>
          <input
            className="device-list-item-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </td>
        <td>
          <input
            className="device-list-item-input"
            value={newModel}
            onChange={(e) => setNewModel(e.target.value)}
          />
        </td>
        <td>
          <div className="device-list-item-button-area">
            <button
              onClick={() => {
                setIsEditMode(false)
              }}
            >
              cancel
            </button>
            <button onClick={onClickUpdateButton}>update</button>
          </div>
        </td>
      </tr>
    )
  }

  if (isEditMode) {
    return <DeviceListItemEditor initialName={name} initialModel={model} />
  } else {
    return <DeviceListItemView />
  }
}

export default DeviceListItem
