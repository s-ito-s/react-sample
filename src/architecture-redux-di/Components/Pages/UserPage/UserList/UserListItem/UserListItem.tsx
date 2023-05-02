// React
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'
import { 
  showLoading,
  hideLoading,
  showMessage,
} from 'architecture-redux-di/Slices/App/slice'

// User Page Store
import { checkUser, updateUser } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Component
import UserListItemView from "./UserListItemView/UserListItemView"
import UserListItemEditor from "./UserListItemEditor/UserListItemEditor"

// Css
import './UserListItem.css'

type UserListItemProps = {
  id: string, 
  name: string,
  departmentId: string,
  department: string
  checked: boolean
}

function UserListItem( {id, name, departmentId, department, checked}: UserListItemProps ) {
  const userPageState = useSelector((s:RootState) => s.userPage)
  const dispatch = useDispatch()

  const [isEdit, setIsEdit] = useState(false)

  const onCheck = (id:string) => {
    const newState = checkUser(userPageState, {id, checked:!checked})
    dispatch(updateState(newState))
  }

  const onEdit = () => {
    setIsEdit(true)
  }

  const onCancel = () => {
    setIsEdit(false)
  }  

  const onUpdate = async (id:string, name:string, departmentId:string) => {
    try {
      // ローディングのクルクル表示
      dispatch(showLoading())

      // 更新処理
      const newState = await updateUser(userPageState, userService, {id, name, departmentId})
      dispatch(updateState(newState))    
      setIsEdit(false)
      
      // 完了メッセージ
      dispatch(showMessage({
        title: 'User Page',
        message: 'User updated',
      }))
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'User Page',
        message: 'error',
      }))          
    } finally {
      // ローディングのクルクル非表示
      dispatch(hideLoading())
    }
  }

  if (isEdit) {
    return <UserListItemEditor 
      id={id}
      name={name}
      departmentId={departmentId}
      department={department}
      checked={checked}
      onCheck={onCheck} 
      onCancel={onCancel}
      onUpdate={onUpdate}
    />
  }else {
    return <UserListItemView 
      id={id}
      name={name} 
      department={department} 
      checked={checked}
      onCheck={onCheck} 
      onEdit={onEdit} 
    />
  }
}

export default UserListItem