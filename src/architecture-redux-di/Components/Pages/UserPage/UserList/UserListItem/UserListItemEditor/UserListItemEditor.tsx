// react
import { useState } from "react"

// Service
import departmentService from 'architecture-redux-di/Service/departmentService'

// Component
import SelectorModal from 'architecture-redux-di/Components/Common/SelectorModal'

// Css
import './UserListItemEditor.css'

type UserListItemEditorProps = {
  id: string,
  name: string,
  departmentId: string,
  department: string,
  checked: boolean
  onCheck: (id:string) => void
  onCancel: () => void
  onUpdate: (id:string, name:string, departmentId:string) => void
}

function UserListItemEditor ({id, name, departmentId, department, checked, onCheck, onCancel, onUpdate}: UserListItemEditorProps) {
  // console.log('render => UserListItemEditor')

  const [newName, setNewName] = useState(name)
  const [newDepartmentId, setNewDepartmentId] = useState(departmentId)
  const [newDepartment, setNewDepartment] = useState(department)
  const [isDepartmentSelectorOpen, openDepartmentSelector] = useState(false)
 
  const onClickUpdateButton = () => {
    onUpdate(id, newName, newDepartmentId)
  }

  const onChangeDepartment = (value:string, label:string) => {
    setNewDepartment(label)
    setNewDepartmentId(value)
    openDepartmentSelector(false)
  }  

  const fetchDepartments = async (offset: number, count: number, searchWord: string) => {
    const res: any = await departmentService.fetchDepartments({offset, count, searchWord})
    return {
      offset: offset,
      count: res.count,
      total: res.total, 
      list: res.list.map ((item: any) => {
        return {
          value: item.id,
          label: item.name,
        } 
      })
    }
  }  

  return (
    <tr key={id}>
      <td>
        <input 
          type="checkbox"
          checked={checked}
          onChange={() => {onCheck(id)}}
        />
      </td>
      <td>
        <input 
          className="user-list-item-name-input"
          value={newName}
          onChange={(e)=>{setNewName(e.target.value)}}
        />
      </td>
      <td>
        <div className="user-list-item-data-cell">
          <span
            className="user-list-item-department-input"
            onClick={() => {openDepartmentSelector(true)}}
          >
            {newDepartment}
          </span>
        </div>
        { 
          isDepartmentSelectorOpen ? 
          <SelectorModal
            title='Department'
            text='Select department'
            initialValue={departmentId}
            fetchFunction={fetchDepartments}
            count={10}
            onCancel={() => openDepartmentSelector(false)}
            onSelect={onChangeDepartment}
          /> : <></>
        }        
      </td>
      <td>
        <div className="user-list-item-button-area">          
          <button onClick={() => {onCancel()}}>
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

export default UserListItemEditor