import './Loading.css'
import loadingIcon from "architecture-redux-di/Assets/loading.gif"

function Loading () {
  return (
    <div className="loader-bg-layer">
      <div className="loader">
        <img src={loadingIcon} />
      </div>
    </div>
  )
}

export default Loading