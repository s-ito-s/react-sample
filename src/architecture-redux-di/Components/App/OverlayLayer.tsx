// React
import { useSelector, useDispatch } from 'react-redux'

// App Store
import type { RootState } from 'architecture-redux-di/Slices/store'
import { 
  hideMessage,
  hideConfirmationMessage,
} from 'architecture-redux-di/Slices/App/slice'

// Component
import Loading from '../Common/Loading';
import MessageModal from '../Common/MessageModal';
import ConfirmationModal from '../Common/ConfirmationModal';
import PopupMessage from '../App/PopupMessage'

function OverlayLayer () {
  const dispatch = useDispatch()
  const appState = useSelector((s:RootState) => s.app)
  const loading = appState.isLoading
  const messageModal = appState.messageModal
  const confirmationModal = appState.confirmationModal
  const popup = appState.popup

  const onCloseMessageModal = () => {
    dispatch(hideMessage())
  }

  const onCancel = () => {
    dispatch(hideConfirmationMessage())
  }  

  const onExecute = () => {
    dispatch(hideConfirmationMessage())
    if (confirmationModal.onExecute) {
      confirmationModal.onExecute()
    }
  }  
  
  return (
    <>
      {
        loading ? 
        <Loading />:<></>
      }
      {
        messageModal.isOpen ? 
        <MessageModal 
          title={messageModal.title} 
          message={messageModal.message}
          onClose={onCloseMessageModal}
        />:<></>
      }
      {
        confirmationModal.isOpen ? 
        <ConfirmationModal 
          title={confirmationModal.title} 
          message={confirmationModal.message}
          onCancel={onCancel}
          onExecute={onExecute}
        />:<></>
      }
      {
        popup.isOpen ? 
        <PopupMessage />: <></>
      }
    </>
  )
}

export default OverlayLayer