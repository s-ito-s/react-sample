import { Link } from "react-router-dom";
import React, { useReducer, useState } from "react";
import { fetchDevices, deleteDevice, updateDevice, registerDevice } from "../ApiRequest";
import "./index.css";

export type Device = {
  id: string;
  name: string;
  model: string;
};

type InitialState = {
  count: number;
  devices: Device[];
};

const initialState: InitialState = {
  count: 0,
  devices: [],
};

const reducer = (state: any, action: any) => {
  // 参照渡しだとリアクティブにならないので、JSON.parseでコピーする
  const myState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case "INCREMENT":
      myState.count = myState.count + 1;
      break;
    case "DECREMENT":
      myState.count = myState.count - 1;
      break;
    case "DEVICES":
      myState.devices = action.content;
      break;
    default:
      break;
  }
  return myState;
};

function SampleUseReducer() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [editTagert, setEditTagert] = useState({ id: "", name: "", model: "" });
  const [newDevice, setNewDevice] = useState({ name: "", model: "" });
  const [nameWord, setNameWord] = useState("");
  const [modelWord, setModelWord] = useState("");

  const onClickFetchDevice = async () => {
    const { data } = await fetchDevices({});
    dispatch({ type: "DEVICES", content: data });
  };

  const increment = () => {
    dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    dispatch({ type: "INCREMENT" });
  };

  const onDelete = async (id: string) => {
    await deleteDevice(id);
    const { data } = await fetchDevices({});
    dispatch({ type: "DEVICES", content: data });
  };

  const onEdit = (id: string) => {
    const target = state.devices.find((device: Device) => device.id === id);
    if (target) {
      setEditTagert(target);
    }
  };

  const onSaveEdit = async () => {
    if (
      editTagert.id === "" ||
      editTagert.name === "" ||
      editTagert.model === ""
    ) {
      return;
    }
    await updateDevice(editTagert.id, editTagert);
    const { data } = await fetchDevices({});
    dispatch({ type: "DEVICES", content: data });
    setEditTagert({
      id: '',
      name: '',
      model: '',
    })
  };

  const onUpdateDevice = async () => {
    if (
      newDevice.name === "" ||
      newDevice.model === ""
    ) {
      return;
    }
    await registerDevice(newDevice.name, newDevice.model);
    const { data } = await fetchDevices({});
    dispatch({ type: "DEVICES", content: data });
    setNewDevice({
      name: '',
      model: '',
    })
  };

  const onSearch = async () => {
    const param: { name?: string; model?: string; } = {}
    if (nameWord !== '') {
      param['name'] = nameWord
    }
    if (modelWord !== '') {
      param['model'] = modelWord
    }
    const { data } = await fetchDevices(param);
    dispatch({ type: "DEVICES", content: data });
  }

  const onResetSearch = async () => {
    setNameWord('')
    setModelWord('')
    const { data } = await fetchDevices({});
    dispatch({ type: "DEVICES", content: data });
  }

  return (
    <div className="container">
      <h1>Sample Redux UseReducer</h1>
      <div className="mb-4">
        <Link to={`/`}>back</Link>
      </div>

      <div className="alert alert-primary" role="alert">
        デバッグ用 count: {state.count}
      </div>

      <div className="mb-4">
        <button className="btn btn-secondary mr-2" onClick={() => increment()}>
          INCREMENT
        </button>
        <button className="btn btn-secondary mr-2" onClick={() => decrement()}>
          DECREMENT
        </button>
        <button className="btn btn-secondary" onClick={onClickFetchDevice}>
          FetchDevice
        </button>
      </div>

      <div className="row">
        <div className="col-8">

          <div className="border p-3 mb-5">
            <h5>検索</h5>
            <div className="row">
              <div className="col-6">
                <div className="form-group">
                  <label>name</label>
                  <input type="text" className="form-control" value={nameWord} onChange={(e) => setNameWord(e.target.value)} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>model</label>
                  <input type="text" className="form-control" value={modelWord} onChange={(e) => setModelWord(e.target.value)} />
                </div>
              </div>
            </div>
            <div>
              <button className="btn btn-primary mr-2" onClick={onSearch}>
                検索
              </button>
              <button className="btn btn-secondary" onClick={onResetSearch}>
                リセット
              </button>
            </div>
          </div>

          <div className="devices mb-4">
            <h2>Device Table <small>{ state.devices.length }件</small></h2>
            <table className="table">
              <thead>
                <tr>
                  <th style={{ width: 300 }}>id</th>
                  <th style={{ width: 140 }}>model</th>
                  <th>name</th>
                  <th>#</th>
                </tr>
              </thead>
              <tbody>
                {state.devices.map((device: Device) => {
                  return (
                    <tr key={device.id}>
                      <td>{device.id}</td>
                      <td>{device.model}</td>
                      <td>{device.name}</td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          onClick={() => onEdit(device.id)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger mr-2"
                          onClick={() => onDelete(device.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="col-4">
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Device編集</h5>
              <p>対象デバイスID: {editTagert.id}</p>

              <div className="form-group">
                <label>device name</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTagert.name}
                  onChange={(e) => {
                    setEditTagert({
                      ...editTagert,
                      name: e.target.value,
                    })
                  }}
                />
              </div>

              <div className="form-group">
                <label>device model</label>
                <input
                  type="text"
                  className="form-control"
                  value={editTagert.model}
                  onChange={(e) => {
                    setEditTagert({
                      ...editTagert,
                      model: e.target.value,
                    })
                  }}
                />
              </div>

              <button className="btn btn-primary" onClick={onSaveEdit}>
                保存
              </button>
            </div>
          </div>
          <div className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Device登録</h5>
              <div className="form-group">
                <label>device name</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDevice.name}
                  onChange={(e) => {
                    setNewDevice({
                      ...newDevice,
                      name: e.target.value,
                    })
                  }}
                />
              </div>

              <div className="form-group">
                <label>device model</label>
                <input
                  type="text"
                  className="form-control"
                  value={newDevice.model}
                  onChange={(e) => {
                    setNewDevice({
                      ...newDevice,
                      model: e.target.value,
                    })
                  }}
                />
              </div>

              <button className="btn btn-primary" onClick={onUpdateDevice}>登録</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SampleUseReducer;
