
type DeviceListItemViewProps = {
  id: string, 
  name: string,
  model: string,
  onEdit: () => void
  onDelete: (id:string) => void
}

const DeviceListItemView = ( {id, name, model, onEdit, onDelete}: DeviceListItemViewProps) => {

  const onClickEditButton = () => {
    onEdit()
  }

  const onClickDeleteButton = () => {
    onDelete(id)
  }

  return (
    <tr key={id}>
      <td>{name}</td>
      <td>{model}</td>
      <td>
        <div className="device-list-item-button-area">
          <button onClick={onClickEditButton}>
            Edit
          </button>
          <button onClick={onClickDeleteButton}>
            Delete
          </button>          
        </div>
      </td>
    </tr>
  )
}

export default DeviceListItemView