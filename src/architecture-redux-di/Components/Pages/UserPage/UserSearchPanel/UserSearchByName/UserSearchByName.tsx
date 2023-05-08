// React
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'

// User Page Store
import { startLoading, fetchUsers } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Css
import './UserSearchByName.css'

let timerId: any = null

function UserSearchByName () {
  // console.log('render => UserSearchByName')

  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const isLoading = userPageState.isLoading
  const [userName, setUserName] = useState('')

  const onChangeNameSearchParam = (e:any) => {
    const name = e.target.value
    setUserName(name)
    console.log('---input---', name)

    if (!isLoading) {
      dispatch(updateState(startLoading(userPageState)))
    }

    // このへんは lodash の debounce でスッキリかけるかも
    if (timerId) {
      clearTimeout(timerId)
      timerId = null
    }
    timerId = setTimeout( () => {
      console.log('---fetch---', name)
      fetchUsers(
        userPageState, userService, {offset: 0, name}, 
        (newState) => {dispatch(updateState(newState))}
      )
      timerId = null
    }, 500)
  }

  return (
    <div className='user-search-by-name'>
      <span>Name</span>
      <input
        className='user-search-name-input' 
        value={userName} 
        placeholder='name'
        onInput={onChangeNameSearchParam}
      /> 
    </div>
  )
}

export default UserSearchByName