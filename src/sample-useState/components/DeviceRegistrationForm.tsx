import { useState } from "react"
import './DeviceRegistrationForm.css'
import {
  VanillaButton,
  VanillaButtonProps,
  CSSModulesButton,
} from "component-library-module";

type BtnProps = VanillaButtonProps["variant"];

function DeviceRegistrationForm({
  onRegister,
}: {
  onRegister: (name: string, model: string) => void;
}) {
  const [name, setName] = useState("");
  const [model, setModel] = useState("");

  const [variant, setVariant] = useState<BtnProps>("primary");

  const onClickRegistrationButton = () => {
    setName("");
    setModel("");
    onRegister(name, model);
  };

  const onClickChangeVariant = () => {
    if (variant === "primary") {
      setVariant("destructive");
    } else {
      setVariant("primary");
    }
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
        {/* CSSのパスをよしなに出来てなくてだめだ～ */}
        <CSSModulesButton onClick={onClickRegistrationButton} variant={variant}>
          hoge
        </CSSModulesButton>
        <VanillaButton onClick={onClickRegistrationButton} variant={variant}>
          Register
        </VanillaButton>
        <button onClick={onClickChangeVariant}>ChangeColor</button>
      </div>
    </div>
  );
}

export default DeviceRegistrationForm