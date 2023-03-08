import { useDispatch, useSelector } from 'react-redux';
import deviceItemSlice from '../redux/DeviceItemSlice';
import { TodoState } from '../redux/store';
import './DeviceRegistrationForm.css';

function DeviceRegistrationForm({
  onRegister,
}: {
  onRegister: (name: string, model: string) => void;
}) {
  const name = useSelector((state: TodoState) => state.deviceItem.name);
  const model = useSelector((state: TodoState) => state.deviceItem.model);
  const dispatch = useDispatch();
  const { setName, setModel } = deviceItemSlice.actions;

  const onClickRegistrationButton = () => {
    dispatch(setName(''));
    dispatch(setModel(''));
    onRegister(name, model);
  };

  return (
    <div>
      <div className='device-registration-form-header'>Registration</div>
      <div className='device-registration-form-row'>
        <div>Name</div>
        <input
          className='device-registration-form-row-input'
          value={name}
          onChange={(e) => {
            dispatch(setName(e.target.value));
          }}
        />
      </div>
      <div className='device-registration-form-row'>
        <div>Model</div>
        <input
          className='device-registration-form-row-input'
          value={model}
          onChange={(e) => {
            dispatch(setModel(e.target.value));
          }}
        />
      </div>
      <div className='device-registration-button-area'>
        <button onClick={onClickRegistrationButton}>Register</button>
      </div>
    </div>
  );
}

export default DeviceRegistrationForm;
