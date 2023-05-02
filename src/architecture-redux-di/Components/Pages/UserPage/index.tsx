// React
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// App Stotre
import { RootState } from 'architecture-redux-di/Slices/store'

// User Page Store
import { initialize } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Component
import UserSearchPanel from './UserSearchPanel/UserSearchPanel'
import UserPageFunctionPanel from './UserPageFunctionPanel/UserPageFunctionPanel'
import UserList from './UserList/UserList'

function UserPage () {
  const userPageState = useSelector((s:RootState) => s.userPage)
  const dispatch = useDispatch()

  useEffect(() => {
    (async ()=> {
      const newState = await initialize(userPageState, userService)
      dispatch(updateState(newState))
    })()
  },[])

  return (
    <div>     
      <UserSearchPanel />
      <UserPageFunctionPanel />
      <UserList />
    </div>
  )
}

export default UserPage