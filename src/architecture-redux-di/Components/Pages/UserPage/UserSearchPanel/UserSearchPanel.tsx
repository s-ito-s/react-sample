// Component
import UserSearchByName from './UserSearchByName/UserSearchByName'
import UserSearchByDepartment from './UserSearchByDepartment/UserSearchByDepartment'

// Css
import './UserSearchPanel.css'

function UserSearchPanel () {
  // console.log('render => UserSearchPanel')

  return (
    <>
      <div className='user-search-panel'>
        <div className='user-search-panel-label'>Search</div>
        <div className='user-search-panel-input'>
          <UserSearchByName />
          <UserSearchByDepartment />
        </div>
      </div>
    </>
  )
}

export default UserSearchPanel