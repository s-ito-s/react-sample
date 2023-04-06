import './DeviceListItem.css';
import { useSelector, useDispatch } from 'react-redux';
import deviceItemSlice from '../redux/DeviceItemSlice';
import { TodoState } from '../redux/store';
import './DeviceListItem.css';
import { useEffect } from 'react';

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
  const isEditMode = useSelector(
    (state: TodoState) => state.deviceItem.isEditMode
  );
  const editItemId = useSelector(
    (state: TodoState) => state.deviceItem.editItemId
  );
  const { startEdit, endEdit, setNewName, setNewModel } =
    deviceItemSlice.actions;
  const dispatch = useDispatch();

  const onClickEditButton = () => {
    dispatch(startEdit({ isEdit: true, id: id }));
  };

  const onClickDeleteButton = () => {
    onDelete(id);
    dispatch(endEdit());
  };

  const onClickUpdateButton = (newName: string, newModel: string) => {
    onUpdate(id, { name: newName, model: newModel });
    dispatch(endEdit());
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
    useEffect(() => {
      dispatch(setNewName(initialName));
      dispatch(setNewModel(initialModel));
    }, [dispatch]);

    const newName = useSelector((state: TodoState) => state.deviceItem.newName);
    const newModel = useSelector(
      (state: TodoState) => state.deviceItem.newModel
    );

    return (
      <tr key={id}>
        <td>
          <input
            className='device-list-item-input'
            value={newName}
            onChange={(e) => {
              dispatch(setNewName(e.target.value));
            }}
          />
        </td>
        <td>
          <input
            className='device-list-item-input'
            value={newModel}
            onChange={(e) => {
              dispatch(setNewModel(e.target.value));
            }}
          />
        </td>
        <td>
          <div className='device-list-item-button-area'>
            <button
              onClick={() => {
                dispatch(endEdit());
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

  if (isEditMode && id === editItemId) {
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
