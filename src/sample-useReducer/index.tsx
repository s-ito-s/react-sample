import { Link } from "react-router-dom";
import React, { useReducer } from "react";
import { fetchDevices } from "../ApiRequest"
import axios from "axios";

const initialState = {
  count: 0,
};
const reducer = (state: any, action: any) => {
  if (action === "INCREMENT") {
    return { count: state.count + 1 };
  } else {
    return { count: state.count - 1 };
  }
};

const onClickFetchDevice = async () => {
  const { data } = await fetchDevices({})
  console.log(data)
}

function SampleUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <h1>Sample Redux UseReducer</h1>
      <div className="x">{ state.count }</div>
      <button onClick={ () => dispatch('INCREMENT') }>INCREMENT</button>
      <button onClick={ onClickFetchDevice }>onClickFetchDevice</button>
      <div>
        <Link to={`/`}>back</Link>
      </div>
    </div>
  );
}

export default SampleUseReducer;
