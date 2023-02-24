import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, TodoState } from './redux/store';
import { Link } from 'react-router-dom';
import SearchPanel from './components/SearchPanel';
import { SearchParam } from './components/SearchPanel';
import DeviceList from './components/DeviceList';
import { fetchDevicesAsync } from './redux/DeviceListSlice';
import DeviceRegistrationForm from './components/DeviceRegistrationForm';
import { registerDevice, updateDevice, deleteDevice } from '../ApiRequest';
import { useEffect } from 'react';
import './index.css';

function SampleReduxThunk() {
  const deviceList = useSelector((state: TodoState) => state.deviceList.list);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDevicesAsync({}));
  }, [dispatch]);

  const onSearch = async (searchParam: SearchParam) => {
    dispatch(fetchDevicesAsync(searchParam));
  };

  const onRegister = async (name: string, model: string) => {
    await registerDevice(name, model);
    dispatch(fetchDevicesAsync({}));
  };

  const onUpdate = async (
    id: string,
    param: { name?: string; model?: string }
  ) => {
    await updateDevice(id, param);
    dispatch(fetchDevicesAsync({}));
  };

  const onDelete = async (id: string) => {
    await deleteDevice(id);
    dispatch(fetchDevicesAsync({}));
  };

  return (
    <div className='sample-redux-thunk-main'>
      <h1>Sample Redux Thunk</h1>
      <div className='search-panel'>
        <SearchPanel onSearch={onSearch} />
      </div>
      <div className='device-list'>
        <DeviceList
          deviceList={deviceList}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      </div>
      <div className='device-registration-form'>
        <DeviceRegistrationForm onRegister={onRegister} />
      </div>
      <div>
        <Link to={`/`}>back</Link>
      </div>
    </div>
  );
}

export default SampleReduxThunk;
