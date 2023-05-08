// react
import { useState } from "react"
import { useSelector, useDispatch } from 'react-redux'

// App Store
import { RootState } from 'architecture-redux-di/Slices/store'
import { 
  showMessage,
  showConfirmationMessage, 
} from 'architecture-redux-di/Slices/App/slice'

// User Page Store
import { UserPageState } from "architecture-redux-di/Store/Pages/UserPage/state"
import { deleteUsers } from "architecture-redux-di/Store/Pages/UserPage/action"
import { isDeleteButtonDisable } from "architecture-redux-di/Store/Pages/UserPage/selectors"
import { updateState } from 'architecture-redux-di/Slices/Pages/UserPage/slice'

// Service
import userService from "architecture-redux-di/Service/userService"

// Component
import ModalBase from "architecture-redux-di/Components/Common/ModalBase"

// Css
import './UserDeletion.css'

// キャンセルフラグは setState で即時更新されない。。
// クラスコンポーネントで書いた方が良いかも。。
let cancelFlag = false

function UserDeletion () {
  // console.log('render => UserDeletion')

  const userPageState = useSelector((s:RootState) => s.userPage)
  const isDisable = isDeleteButtonDisable(userPageState)
  const isProcessing = userPageState.isProcessing
  const progressRate = userPageState.progressRate
  const dispatch = useDispatch()  

  const onClickDeleteButton = () => {
    dispatch(showConfirmationMessage({
      title: 'User Page',
      message: 'Are you sure to delete users?',
      onExecute: () => {executeUserDeletion()}
    }))
  }

  const executeUserDeletion = async () => {
    try {
      // 削除処理
      await deleteUsers(userPageState, userService, (newState:UserPageState, completeUserIds:string[]) => {
        dispatch(updateState(newState))
        return cancelFlag
      })

      // 完了メッセージ
      if (cancelFlag) {
        dispatch(showMessage({
          title: 'User Page',
          message: 'canceled',
        }))
      }else{
        dispatch(showMessage({
          title: 'User Page',
          message: 'user deleted',
        }))        
      }
    } catch(error: any){
      // エラーメッセージ
      dispatch(showMessage({
        title: 'User Page',
        message: 'delete error',
      }))          
    } finally {
      cancelFlag = false
    }
  }

  const onCancel = () => {
    cancelFlag = true
  }

  return (
    <>
      <button 
        disabled={isDisable}
        onClick={onClickDeleteButton}
      >
        Delete
      </button>
      {
        isProcessing ?
        <ModalBase>
          <div className="user-deletion-modal-header">
            User Deletion
          </div>
          <div className="user-deletion-modal-main">
            {
              cancelFlag ? 
              <span>Cancel</span> : 
              <span>Deleting ...</span>
            }
            <span>{Math.floor(progressRate * 100)} %</span>
          </div>
          {
            !cancelFlag ?       
            <div className="user-deletion-modal-footer">
              <button onClick={onCancel}>
                cancel
              </button>
            </div>: <></>
          }
        </ModalBase>
        : <></>
      }
    </>
  )
}

export default UserDeletion