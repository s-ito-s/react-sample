
import './UserListItemView.css'

type UserListItemViewProps = {
  id: string, 
  name: string,
  department: string,
  checked: boolean
  onCheck: (id:string) => void
  onEdit: () => void
}

const UserListItemView = ( {id, name, department, checked, onCheck, onEdit}: UserListItemViewProps) => {
  // console.log('render => UserListItemView')

  const onClickCheckBox = () => {
    onCheck(id)
  }

  const onClickEditButton = () => {
    onEdit()
  }

  return (
    <tr key={id}>
      <td>
        <input 
          type="checkbox"
          checked={checked}
          onChange={onClickCheckBox}
        />
      </td>
      <td>{name}</td>
      <td>{department}</td>
      <td>
        <div className="user-list-item-button-area">
          <button onClick={onClickEditButton}>
            Edit
          </button>
        </div>
      </td>
    </tr>
  )
}

export default UserListItemView