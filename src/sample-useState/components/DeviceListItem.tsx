import { useState } from 'react';
import './DeviceListItem.css';

type DeviceListItemProps = {
  id: string;
  name: string;
  model: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, param: { name?: string; model?: string }) => void;
};

type DevictListItemEditorProps = {
  initialName: string;
  initialModel: string;
  onClickUpdateButton: (name: string, model: string) => void;
};

function DeviceListItem({
  id,
  name,
  model,
  onDelete,
  onUpdate,
}: DeviceListItemProps) {
  const [isEditMode, setEditMode] = useState(false);

  const onClickEditButton = () => {
    setEditMode(true);
  };

  const onClickDeleteButton = () => {
    onDelete(id);
    setEditMode(false);
  };

  const onClickUpdateButton = (newName: string, newModel: string) => {
    onUpdate(id, { name: newName, model: newModel });
    setEditMode(false);
  };

  const DeviceListItemView = () => {
    return (
      <tr key={id}>
        <td>{name}</td>
        <td>{model}</td>
        <td>
          <div className='device-list-item-button-area'>
            <button onClick={onClickEditButton}>Edit</button>
            <button onClick={onClickDeleteButton}>Delete</button>
          </div>
        </td>
      </tr>
    );
  };

  const DeviceListItemEditor = ({
    initialName,
    initialModel,
    onClickUpdateButton,
  }: DevictListItemEditorProps) => {
    const [newName, setNewName] = useState(initialName);
    const [newModel, setNewModel] = useState(initialModel);

    return (
      <tr key={id}>
        <td>
          <input
            className='device-list-item-input'
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
          />
        </td>
        <td>
          <input
            className='device-list-item-input'
            value={newModel}
            onChange={(e) => {
              setNewModel(e.target.value);
            }}
          />
        </td>
        <td>
          <div className='device-list-item-button-area'>
            <button
              onClick={() => {
                setEditMode(false);
              }}
            >
              cancel
            </button>
            <button
              onClick={() => {
                onClickUpdateButton(newName, newModel);
              }}
            >
              update
            </button>
          </div>
        </td>
      </tr>
    );
  };

  if (isEditMode) {
    return (
      <DeviceListItemEditor
        initialName={name}
        initialModel={model}
        onClickUpdateButton={onClickUpdateButton}
      />
    );
  } else {
    return <DeviceListItemView />;
  }
}

export default DeviceListItem;
