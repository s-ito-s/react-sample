import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SearchPanel from "./components/SearchPanel";
import { SearchParam } from "./components/SearchPanel";
import DeviceList from "./components/DeviceList";
import { Device } from "./components/DeviceList";
import DeviceRegistrationForm from "./components/DeviceRegistrationForm";
import {
  registerDevice,
  fetchDevices,
  updateDevice,
  deleteDevice,
} from "../ApiRequest";
import "component-library-module/dist/index.css";

function SampleUseState() {
  const [deviceList, setDeviceList] = useState<Device[]>([]);

  useEffect(() => {
    (async () => {
      const response = await fetchDevices({});
      setDeviceList(response.data);
    })();
  }, []);

  const onSearch = async (searchParam: SearchParam) => {
    const response = await fetchDevices(searchParam);
    setDeviceList(response.data);
  };

  const onRegister = async (name: string, model: string) => {
    await registerDevice(name, model);
    const response = await fetchDevices({});
    setDeviceList(response.data);
  };

  const onUpdate = async (
    id: string,
    param: { name?: string; model?: string }
  ) => {
    await updateDevice(id, param);
    const response = await fetchDevices({});
    setDeviceList(response.data);
  };

  const onDelete = async (id: string) => {
    await deleteDevice(id);
    const response = await fetchDevices({});
    setDeviceList(response.data);
  };

  return (
    <div className="sfds-u-textArea__wrap sfds-u-pl-6 sfds-u-pr-6 sfds-u-pt-6 sfds-u-pb-6">
      <h1 className="sfds-u-text__size-2xl">Sample Use CSSModules</h1>
      <div className="sfds-u-mb-7">
        <SearchPanel onSearch={onSearch} />
      </div>
      <div className="sfds-u-mb-7">
        <DeviceList
          deviceList={deviceList}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      </div>
      <div className="sfds-u-mb-7">
        <DeviceRegistrationForm onRegister={onRegister} />
      </div>
      <div>
        <Link to={`/`}>Back</Link>
      </div>
    </div>
  );
}

export default SampleUseState;
