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
import departmentService from 'architecture-redux-di/Service/departmentService'

// Component
import SelectorModal from 'architecture-redux-di/Components/Common/SelectorModal'

// Css
import './UserSearchPanel.css'

let timerId: any = null

function UserSearchPanel () {
  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const departmentName = userPageState.searchParam.departmentName
  const isLoading = userPageState.isLoading
  const [isDepartmentSelectorOpen, openDepartmentSelector] = useState(false)
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

  const onClickDepartmentSelectButton = () => {
    openDepartmentSelector(true)
  }

  const onChangeDepartmentSearchParam = (value:string, label:string) => {
    const param = {offset: 0, department: value, departmentName: label}
    fetchUsers(
      userPageState, userService, param,
      (newState) => {dispatch(updateState(newState))}
    )    
    openDepartmentSelector(false)
  }

  const fetchDepartments = async (offset: number, count: number, searchWord: string) => {
    const res: any = await departmentService.fetchDepartments({offset, count})
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
    <>
      <div className='user-search-panel'>
        <div className='user-search-panel-label'>Search</div>
        <div className='user-search-panel-input'>
          <div className='user-search-panel-row'>
            <span>Name</span>
            <input
              className='user-search-panel-name-input' 
              value={userName} 
              placeholder='name'
              onInput={onChangeNameSearchParam}
            /> 
          </div>
          <div className='user-search-panel-row'>
            <span>Department</span>
            <span className='user-search-panel-department-input'>
              {departmentName ? departmentName : '-' }
            </span>
            <button onClick={onClickDepartmentSelectButton}>select</button>
          </div>    
        </div>
      </div>
      { isDepartmentSelectorOpen ? 
        <SelectorModal
          title='Department'
          text='Select department'
          initialValue={userPageState.searchParam.departmentId}
          fetchFunction={fetchDepartments}
          count={10}
          clearButton={true}
          onCancel={() => openDepartmentSelector(false)}
          onExecute={onChangeDepartmentSearchParam}
        /> : <></>
      }
    </>    
  )
}

export default UserSearchPanel