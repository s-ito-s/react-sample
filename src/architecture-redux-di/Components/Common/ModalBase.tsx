
import { ReactNode } from 'react';

import './ModalBase.css'

type ModalBaseProps = { children: ReactNode };

function ModalBase ({ children }: ModalBaseProps) {
  return (
    <div className="modal-base-bg-layer">
      <div className="modal-base-main">
        { children }
      </div>
    </div>
  )
}

export default ModalBase