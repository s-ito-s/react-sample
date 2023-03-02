import { useState } from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import { devicesState } from "../states/devicesState"
import { inputEditTextState } from "../states/inputEditTextState"
import { updateDevice, deleteDevice } from "../../ApiRequest"
import { fetchDevices } from "../../ApiRequest"
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
  const setDevicesState = useSetRecoilState(devicesState)

  // コンポーネント内でしか使わないのはuseStateを使う方が良さそう
  const [isEditMode, setIsEditMode] = useState(false)

  const onClickDeleteButton = async () => {
    setIsEditMode(false)
    deleteDevice(id)

    const { data } = await fetchDevices({})
    setDevicesState(data)
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

    const onClickUpdateButton = async () => {
      updateDevice(id, { name: newName, model: newModel })

      const { data } = await fetchDevices({})
      setDevicesState(data)
    }

    const onClickClearButton = () => {
      setNewName(initialName)
      setNewModel(initialModel)
      setIsEditMode(false)
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
            <button onClick={onClickClearButton}>cancel</button>
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
