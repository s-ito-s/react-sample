import { ReactNode } from 'react';

import ModalBase from './ModalBase';

import './ConfirmationModal.css'

type ConfirmationModalProps = { 
  title: string
  message: string | string[]
  onCancel: () => void
  onExecute: () => void
};

function ConfirmationModal ( {title, message, onCancel, onExecute}: ConfirmationModalProps) {

  const messageText = () => {
    if ( typeof message === "string" ) {
      return <>{ message }</>
    } else if ( typeof message === "object" ) {
      return message.map( (m, index) => {
        return <div key={'confirmation-modal-text-'+index}>{ m }</div>
      })
    } else {
      return <></>
    }
  }

  return (
    <ModalBase>
      <div className='confirmation-modal-header'>
        { title }
      </div>
      <div className='confirmation-modal-text'>
        { messageText() }
      </div>
      <div className='confirmation-modal-footer'>
        <button onClick={() => {onCancel()}}>cancel</button>
        <div className='confirmation-modal-footer-space'></div>
        <button onClick={() => {onExecute()}}>execute</button>
      </div>
    </ModalBase>
  )
}

export default ConfirmationModal