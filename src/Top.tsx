import { Link } from "react-router-dom"

function Top() {
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
      <div>
        <Link to={`/redux-di`}>redux di</Link>      
      </div>        
      <div>
        <Link to={`/component-library`}>component library</Link>
      </div>
      <div>
        <br />
        <h2>メモ化用サンプル</h2>
        <br />
        <Link to={`/counter`}>counter</Link>
      </div>
      <div>
        <Link to={`/counterMemo`}>counter memo</Link>
      </div>
    </div>
  )
}

export default Top
