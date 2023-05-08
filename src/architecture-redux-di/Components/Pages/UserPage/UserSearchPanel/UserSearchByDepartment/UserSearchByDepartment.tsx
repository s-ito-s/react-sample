// React
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'

// User Page Store
import { fetchUsers } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Component
import DepartmentSelector from './DepartmentSelector/DepartmentSelector'

// Css
import './UserSearchByDepartment.css'

function UserSearchByDepartment () {
  // console.log('render => UserSearchByDepartment')

  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const departmentName = userPageState.searchParam.departmentName
  const departmentId = userPageState.searchParam.departmentId
  const [isDepartmentSelectorOpen, openDepartmentSelector] = useState(false)

  const onChangeDepartmentSearchParam = (value:string, label:string) => {
    const param = {offset: 0, department: value, departmentName: label}
    fetchUsers(
      userPageState, userService, param,
      (newState) => {dispatch(updateState(newState))}
    )    
    openDepartmentSelector(false)
  }

  return (
    <>
      <div className='user-search-department'>
        <span>Department</span>
        <span 
          onClick={() => {openDepartmentSelector(true)}}
          className='user-search-department-input'
        >
          {departmentName ? departmentName : '-' }
        </span>
      </div>   
      { 
        isDepartmentSelectorOpen ? 
        <DepartmentSelector
          initialValue={departmentId}
          onCancel={() => openDepartmentSelector(false)}
          onSelect={onChangeDepartmentSearchParam}
        /> : <></>
      }  
    </>
  )
}

export default UserSearchByDepartment