import { ReactNode } from 'react';

import './Popup.css'

type PopupProps = { 
  children: ReactNode
  onClose: () => void
};

function Popup ( {children, onClose}: PopupProps) {
  return (
    <div className='popup'>
      <div>{ children }</div>
      <div className='popup-close-button' onClick={onClose}>×</div>
    </div>
  )
}

export default Popup