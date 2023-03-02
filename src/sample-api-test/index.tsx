import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CustomAxiosRequest } from '../lib/service/customAxiosRequests';
import { DeviceServiceRequests } from '../lib/service/deviceService';
import DeviceList from '../sample-useState/components/DeviceList';
import { Device } from '../sample-useState/components/DeviceList';
import DeviceRegistrationForm from '../sample-useState/components/DeviceRegistrationForm';
import './index.css';

function SampleAPITest() {
  const [deviceList, setDeviceList] = useState<Device[]>([]);
  const axiosInstance = new CustomAxiosRequest();
  const apiRequest = new DeviceServiceRequests(axiosInstance);
  let controller = new AbortController();

  const onClickGetButton = () => {
    controller = new AbortController();
    apiRequest.fetchDevicesDelay({}, controller.signal).then((response) => {
      console.log(response);
      setDeviceList(response);
    });
  };

  const onClickCancelButton = async () => {
    controller.abort();
  };

  const onUpdate = async (
    id: string,
    param: { name?: string; model?: string }
  ) => {
    controller = new AbortController();
    await apiRequest.updateDeviceDelay(id, param, controller.signal);
    const response = await apiRequest.fetchDevices({}, controller.signal);
    setDeviceList(response);
  };

  const onDelete = async (id: string) => {
    controller = new AbortController();
    await apiRequest.deleteDeviceDelay(id, controller.signal);
    const response = await apiRequest.fetchDevices({}, controller.signal);
    setDeviceList(response);
  };

  const onRegister = async (name: string, model: string) => {
    controller = new AbortController();
    await apiRequest.registerDeviceDelay(name, model, controller.signal)
    const response = await apiRequest.fetchDevices({}, controller.signal);
    setDeviceList(response)
  }

  return (
    <div className='sample-use-state-main'>
      <h1>Sample API Test</h1>
      <button onClick={onClickGetButton}>Get Device List</button>
      <button onClick={onClickCancelButton}>cancel</button>
      <div className='device-list'>
        <DeviceList
          deviceList={deviceList}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      </div>
      <div className="device-registration-form">
        <DeviceRegistrationForm
          onRegister={onRegister}
        />
      </div>
      <div>
        <Link to={`/`}>Back</Link>
      </div>
    </div>
  );
}

export default SampleAPITest;
