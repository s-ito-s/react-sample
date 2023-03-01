import { Link } from "react-router-dom";

function Top () {
  return (
    <div>
      <h1>React Page Samples</h1>
      <div>
        <Link to={`/useState`}>useState</Link>      
      </div>
      <div>
        <Link to={`/useContext`}>useContext</Link>
      </div>
      <div>
        <Link to={`/useReducer`}>useReducer</Link>      
      </div>
      <div>
        <Link to={`/zustand`}>zustand</Link>      
      </div>
      <div>
        <Link to={`/redux-thunk`}>redux thunk</Link>      
      </div>
      <div>
        <Link to={`/recoil`}>recoil</Link>      
      </div>      
    </div>
  )
}

export default Top
