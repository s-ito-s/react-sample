// React
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'
import { 
  showLoading,
  hideLoading,
  showMessage,
  showPopupMessage,
} from 'architecture-redux-di/Slices/App/slice'

// User Page Store
import { registerUser } from 'architecture-redux-di/Store/Pages/UserPage/action'
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"
import departmentService from 'architecture-redux-di/Service/departmentService'

// Component
import ModalBase from 'architecture-redux-di/Components/Common/ModalBase'
import SelectorModal from 'architecture-redux-di/Components/Common/SelectorModal'

// Css
import './UserRegistration.css'

function UserRegistration () {
  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const [isUserRegistrationModalOpen, showUserRegistrationModal] = useState(false)
  const [isDepartmentSelectorOpen, openDepartmentSelector] = useState(false)
  const [name, setUserName] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [department, setDepartment] = useState('')
 
  const onChangeDepartment = (value:string, label:string) => {
    setDepartment(label)
    setDepartmentId(value)
    openDepartmentSelector(false)
  }

  const onClickRegisterButton = async () => {
    try {
      // ローディングのクルクル表示
      dispatch(showLoading())

      // 更新処理
      const param = {name, departmentId}
      const newState = await registerUser(userPageState, userService, param)
      dispatch(updateState(newState))    
      
      // 完了メッセージ
      dispatch(showPopupMessage({
        text: 'user regisered',
      }))
      // dispatch(showMessage({
      //   title: 'User Page',
      //   message: 'User registered',
      // }))
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'User Page',
        message: 'error',
      }))          
    } finally {
      // ローディングのクルクル非表示
      dispatch(hideLoading())

      // 初期化
      reset()
    }
  }

  const reset = () => {
    setUserName('')
    setDepartment('')
    setDepartmentId('')
    openDepartmentSelector(false)
    showUserRegistrationModal(false)   
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
      <button onClick={() => {showUserRegistrationModal(true)}}>Register</button>
      {
        isUserRegistrationModalOpen ? 
        <ModalBase>
          <div className='user-registration-modal-header'>
            User Registration
          </div>
          <div className='user-registration-modal-main'>
            <div className='user-registration-modal-input'>
              <span className='user-registration-modal-input-label'>Name</span>
              <input
                className='user-registration-modal-name-input' 
                value={name}
                onChange={(e)=>{setUserName(e.target.value)}}
              />              
            </div>
            <div className='user-registration-modal-input'>
              <span className='user-registration-modal-input-label'>Department</span>
              <div className='user-registration-modal-department-input'>
                {
                  departmentId === '' ?
                  <span>-</span> : <span>{department}</span>
                }
                <button onClick={() => {openDepartmentSelector(true)}}>select</button>
              </div>
            </div>
          </div>
          <div className='user-registration-modal-footer'>
            <button onClick={reset}>
              cancel
            </button>
            <button onClick={onClickRegisterButton}>
              register
            </button>            
          </div>          
        </ModalBase>
        : <></>
      }
      { isDepartmentSelectorOpen ? 
        <SelectorModal
          title='Department'
          text='Select department'
          initialValue={departmentId}
          fetchFunction={fetchDepartments}
          count={10}
          onCancel={() => openDepartmentSelector(false)}
          onExecute={onChangeDepartment}
        /> : <></>
      }
    </>
  )
}

export default UserRegistration