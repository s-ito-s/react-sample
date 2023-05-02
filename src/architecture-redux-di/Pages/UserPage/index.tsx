import DefaultLayout from "architecture-redux-di/Components/Layout/DefaultLayout"
import UserPage from "architecture-redux-di/Components/Pages/UserPage"

function UserPageTop () {
  return (
    <DefaultLayout>
      <UserPage/>
    </DefaultLayout>
  )
}

export default UserPageTop