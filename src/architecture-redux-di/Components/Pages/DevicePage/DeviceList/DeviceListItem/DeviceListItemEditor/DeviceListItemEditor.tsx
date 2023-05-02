// react
import { useState } from "react"

// Component
import './DeviceListItemEditor.css'

type DevictListItemEditorProps = {
  id: string,
  name: string,
  model: string,
  onCancel: () => void
  onUpdate: (id:string, name:string, model:string) => void
}

const DeviceListItemEditor = ({id, name, model, onCancel, onUpdate}: DevictListItemEditorProps) => {
  const [newName, setNewName] = useState(name)
  const [newModel, setNewModel] = useState(model) 

  const onClickCancelButton = () => {
    onCancel()
  }

  const onClickUpdateButton = () => {
    onUpdate(id, newName, newModel)
  }

  return (
    <tr key={id}>
      <td>
        <input 
          className="device-list-item-input"
          value={newName}
          onChange={(e)=>{setNewName(e.target.value)}}
        />
      </td>
      <td>
        <input 
          className="device-list-item-input"
          value={newModel}
          onChange={(e)=>{setNewModel(e.target.value)}}
        />
      </td>
      <td>
        <div className="device-list-item-button-area">          
          <button onClick={onClickCancelButton}>
            cancel
          </button>
          <button onClick={onClickUpdateButton}>
            update
          </button>
        </div>
      </td>
    </tr>
  )
}

export default DeviceListItemEditor