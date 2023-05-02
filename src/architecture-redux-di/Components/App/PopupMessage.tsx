import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'

// App Store
import type { RootState } from 'architecture-redux-di/Slices/store'
import { hidePopupMessage,} from 'architecture-redux-di/Slices/App/slice'

// Component
import Popup from '../Common/Popup';

function PopupMessage () {
  const dispatch = useDispatch()
  const appState = useSelector((s:RootState) => s.app)
  const popup = appState.popup

  useEffect(() => {
    if (popup.isOpen) {
      setTimeout( () => {
        dispatch(hidePopupMessage())
      }, 5000)
    }
  },[])

  const onClosePopupMessage = () => {
    dispatch(hidePopupMessage())
  }

  return (
    <Popup onClose={onClosePopupMessage}>
      {popup.text}
    </Popup>
  )
}

export default PopupMessage