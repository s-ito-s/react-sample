import ModalBase from './ModalBase';

import './MessageModal.css'

type MessageModalProps = { 
  title: string
  message: string | string[]
  onClose: () => void
};

function MessageModal ( {title, message, onClose}: MessageModalProps) {

  const messageText = () => {
    if ( typeof message === "string" ) {
      return <>{ message }</>
    } else if (Array.isArray(message)) {
      return message.map( (m, index) => {
        return <div key={'message-modal-text-'+index}>{ m }</div>
      })
    } else {
      return <></>
    }
  }

  return (
    <ModalBase>
      <div className='message-modal-header'>
        { title }
      </div>
      <div className='message-modal-text'>
        { messageText() }
      </div>
      <div className='message-modal-footer'>
        <button onClick={() => {onClose()}}>close</button>
      </div>
    </ModalBase>
  )
}

export default MessageModal