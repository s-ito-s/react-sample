import { useEffect } from 'react';
import useStore from './store';
import { Link } from "react-router-dom"
import SearchPanel from "./components/SearchPanel"
import { SearchParam } from "./components/SearchPanel"
import DeviceList from "./components/DeviceList"
import DeviceRegistrationForm from './components/DeviceRegistrationForm';
import './index.css'

function SampleZustand () {
  const deviceList = useStore((state) => state.deviceList)
  const fetchDevices = useStore((state) => state.fetchDevices)
  const registerDevice = useStore((state) => state.registerDevice)
  const updateDevice = useStore((state) => state.updateDevice)
  const deleteDevice = useStore((state) => state.deleteDevice)

  useEffect(() => {
    fetchDevices({})
  }, [fetchDevices])

  const onSearch = (searchParam: SearchParam) => {
    fetchDevices(searchParam)
  }

  const onRegister = (name: string, model: string) => {
    registerDevice(name, model)
  }

  const onUpdate = (id: string, param: { name?: string, model?: string}) => {
    updateDevice(id, param)
  }

  const onDelete = (id: string) => {
    deleteDevice(id)
  }

  return (
    <div className="sample-zustand-main">
      <h1>Sample Zustand</h1>
      <div className="search-panel">
        <SearchPanel onSearch={onSearch} />
      </div>
      <div className="device-list">
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
        <Link to={`/`}>back</Link>        
      </div>
    </div>    
  )
}

export default SampleZustand
