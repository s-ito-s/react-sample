// React
import { useState } from 'react'

// Service
import departmentService from 'architecture-redux-di/Service/departmentService'

// Component
import ModalBase from 'architecture-redux-di/Components/Common/ModalBase'
import SelectorModal from 'architecture-redux-di/Components/Common/SelectorModal'

// Css
import './UserRegistrationModal.css'

type UserRegistrationModalProps = {
  onCancel: () => void
  onRegister: (name:string, departmentId:string) => void
}

function UserRegistrationModal ({onCancel, onRegister}:UserRegistrationModalProps ) {
  // console.log('render => UserRegistrationModal')

  const [isDepartmentSelectorOpen, openDepartmentSelector] = useState(false)
  const [name, setUserName] = useState('')
  const [departmentId, setDepartmentId] = useState('')
  const [department, setDepartment] = useState('')

  const onChangeDepartment = (value:string, label:string) => {
    setDepartment(label)
    setDepartmentId(value)
    openDepartmentSelector(false)
  }

  const onClickCancelButton = () => {
    setUserName('')
    setDepartment('')
    setDepartmentId('')
    openDepartmentSelector(false)
    onCancel()
  }

  const fetchDepartments = async (offset: number, count: number, searchWord: string) => {
    const res: any = await departmentService.fetchDepartments({offset, count, searchWord})
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
          <button onClick={onClickCancelButton}>
            cancel
          </button>
          <button onClick={() => {onRegister(name, departmentId)}}>
            register
          </button>
        </div>
      </ModalBase>
      {
        isDepartmentSelectorOpen ? 
        <SelectorModal
          title='Department'
          text='Select department'
          initialValue={departmentId}
          fetchFunction={fetchDepartments}
          count={10}
          onCancel={() => openDepartmentSelector(false)}
          onSelect={onChangeDepartment}
        /> : <></>
      }
    </>
  )
}

export default UserRegistrationModal