import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const deviceItemSlice = createSlice({
  name: 'deviceItem',
  initialState: {
    isEditMode: false,
    editItemId: '',
    name: '',
    model: '',
    initialName: '',
    initialModel: '',
    newName: '',
    newModel: '',
  },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
    startEdit: (
      state,
      action: PayloadAction<{ isEdit: boolean; id: string }>
    ) => {
      state.isEditMode = action.payload.isEdit;
      state.editItemId = action.payload.id;
    },
    endEdit: (state, _action: PayloadAction) => {
      state.isEditMode = false;
      state.editItemId = '';
    },
    setNewName: (state, action: PayloadAction<string>) => {
      state.newName = action.payload;
    },
    setNewModel: (state, action: PayloadAction<string>) => {
      state.newModel = action.payload;
    },
  },
});

export type DeviceItemState = {
  isEditMode: boolean;
  editItemId: '';
  name: string;
  model: string;
  initialName: string;
  initialModel: string;
  newName: string;
  newModel: string;
};

export default deviceItemSlice;
