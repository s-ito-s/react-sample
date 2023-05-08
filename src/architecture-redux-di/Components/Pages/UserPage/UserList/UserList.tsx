// React
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'

// User Page Store
import { checkUsers } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { isAllUserChecked } from 'architecture-redux-di/Store/Pages/UserPage/selectors'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Component
import UserListItem from './UserListItem/UserListItem'
import loadingIcon from "architecture-redux-di/Assets/loading.gif"

// Css
import './UserList.css'

function UserList () {
  // console.log('render => UserList')

  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const isAllChecked = isAllUserChecked(userPageState)
  const userList = userPageState.userList

  const onCheck = () => {
    const newState = checkUsers(userPageState)
    dispatch(updateState(newState))
  }

  return (
    <table className="user-list-table">
      <thead>
        <tr>
          <th className="user-list-cell-check">
            <input type="checkbox" checked={isAllChecked} onChange={onCheck}/> 
          </th>          
          <th className="user-list-cell-name">Name</th>
          <th className="user-list-cell-department">Department</th>
          <th className="user-list-cell-button"></th>
        </tr>
      </thead>
      <tbody>{ 
        userPageState.isLoading ? 
        <tr>
          <td colSpan={4} className="user-list-loading-cell"> 
            <img src={loadingIcon} /> Loading 
          </td>
        </tr>
        :
        <>
          {userList.map((user) => {
            return (
              <UserListItem 
                key={user.id}
                id={user.id}
                name={user.name}
                departmentId={user.departmentId}
                department={user.department}
                checked={user.checked}
              />
            )}
          )}
        </>
      }</tbody> 
    </table>
  )
}

export default UserList