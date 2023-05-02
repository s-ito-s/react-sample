import { Link } from "react-router-dom";

import './SideMenu.css'

function SideMenu () {
  return (
    <div className="app-side-menu">
      <div>
        <Link to={`/architecture-redux-di/device`}>DevicePage</Link>        
      </div>
      <div>
        <Link to={`/architecture-redux-di/user`}>UserPage</Link>
      </div>
    </div>
  )
}

export default SideMenu