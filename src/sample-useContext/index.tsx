import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DeviceContextProvider, DeviceDispatchContext } from "./store/context";
import {
  fetchDevices,
  registerDevice,
  updateDevice,
  deleteDevice,
} from "../ApiRequest";
import { actions, SearchParam } from "./store/reducer";
import SearchPanel from "./components/SearchPanel";
import DeviceList from "./components/DeviceList";
import DeviceRegistrationForm from "./components/DeviceRegistrationForm";

function SampleUseContext() {
  return (
    <DeviceContextProvider>
      <Presentational />
    </DeviceContextProvider>
  );
}

function Presentational() {
  const dispatch = useContext(DeviceDispatchContext);

  useEffect(() => {
    console.log("useEffect");
    onFetch({});
  });

  const onFetch = async (searchParam: SearchParam) => {
    dispatch(actions.startFetch());
    const res = await fetchDevices(searchParam);
    dispatch(actions.successFetch(res.data));
  };

  const onRegister = async (name: string, model: string) => {
    await registerDevice(name, model);
    onFetch({});
  };

  const onUpdate = async (
    id: string,
    param: { name?: string; model?: string }
  ) => {
    await updateDevice(id, param);
    onFetch({});
  };

  const onDelete = async (id: string) => {
    await deleteDevice(id);
    onFetch({});
  };

  return (
    <div className="sample-use-state-main">
      <h1>Sample useContext + useReducer</h1>
      <div className="search-panel">
        <SearchPanel onSearch={onFetch} />
      </div>
      <div className="device-list">
        <DeviceList onDelete={onDelete} onUpdate={onUpdate} />
      </div>
      <div className="device-registration-form">
        <DeviceRegistrationForm onRegister={onRegister} />
      </div>
      <div>
        <Link to={`/`}>Back</Link>
      </div>
    </div>
  );
}

export default SampleUseContext;
