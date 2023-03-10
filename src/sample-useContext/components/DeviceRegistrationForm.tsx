import { useState } from "react";
import "./DeviceRegistrationForm.css";

function DeviceRegistrationForm({
  onRegister,
}: {
  onRegister: (name: string, model: string) => void;
}) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const onClickRegistrationButton = () => {
    setName("");
    setModel("");
    onRegister(name, model);
  };

  return (
    <div>
      <div className="device-registration-form-header">Registration</div>
      <div className="device-registration-form-row">
        <div>Name</div>
        <input
          className="device-registration-form-row-input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      <div className="device-registration-form-row">
        <div>Model</div>
        <input
          className="device-registration-form-row-input"
          value={model}
          onChange={(e) => {
            setModel(e.target.value);
          }}
        />
      </div>
      <div className="device-registration-button-area">
        <button onClick={onClickRegistrationButton}>Register</button>
      </div>
    </div>
  );
}

export default DeviceRegistrationForm;
