
import UserRegistration from "./UserRegisteration/UserRegistration"
import UserDeletion from "./UserDeletion/UserDeletion"
import UserPagePagination from "./UserPagePagination/UserPagePagination"

import './UserPageFunctionPanel.css'

function UserPageFunctionPanel () {
  return (
    <div className="user-page-function-panel">
      <div>
        <UserRegistration />
        <UserDeletion />
      </div>
      <UserPagePagination />
    </div>
  )
}

export default UserPageFunctionPanel