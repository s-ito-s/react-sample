// React
import { useSelector, useDispatch } from 'react-redux'

// Redux
import { RootState } from 'architecture-redux-di/Slices/store'

// User Page Store
import { fetchUsers } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Component
import Pagination from 'architecture-redux-di/Components/Common/Pagination'

// Css
import './UserPagePagination.css'

function UserPagePagination () {
  // console.log('render => UserPagePagination')

  const userPageState = useSelector((s:RootState) => s.userPage)
  const dispatch = useDispatch()

  const onChangePage = async (offset: number) => {
    await fetchUsers(
      userPageState, 
      userService, 
      {offset}, 
      (newState) => {
        dispatch(updateState(newState))
      }
    )
  }

  return (
    <div className='user-page-pagination'>
      <span>Total : {userPageState.total} </span>
      {
        userPageState.total > 0 ?  
        <Pagination 
          offset={userPageState.offset}
          pageSize={userPageState.pageSize}
          total={userPageState.total}
          onChangePage={onChangePage}
        /> : <></>
      }
    </div>
  )
}

export default UserPagePagination