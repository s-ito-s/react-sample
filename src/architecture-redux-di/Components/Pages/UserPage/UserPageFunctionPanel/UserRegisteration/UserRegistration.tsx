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

// Component
import UserRegistrationModal from './UserRegistrationModal/UserRegistrationModal'

// Css
import './UserRegistration.css'

function UserRegistration () {
  // console.log('render => UserRegistration')

  const dispatch = useDispatch()
  const userPageState = useSelector((s:RootState) => s.userPage)

  const [isUserRegistrationModalOpen, showUserRegistrationModal] = useState(false)

  const onRegister = async (name:string, departmentId:string) => {
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
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'User Page',
        message: 'error',
      }))          
    } finally {
      // ローディングのクルクル非表示
      dispatch(hideLoading())

      // モーダルを閉じる
      showUserRegistrationModal(false)   
    }
  }

  return (
    <>
      <button onClick={() => {showUserRegistrationModal(true)}}>Register</button>
      {
        isUserRegistrationModalOpen ? 
        <UserRegistrationModal 
          onCancel={() => {showUserRegistrationModal(false)}}
          onRegister={onRegister}
        /> : <></>
      }
    </>
  )
}

export default UserRegistration