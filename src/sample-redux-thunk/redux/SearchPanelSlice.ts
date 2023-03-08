import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const searchPanelSlice = createSlice({
  name: 'searchPanel',
  initialState: {
    name: '',
    model: '',
  },
  reducers: {
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setModel: (state, action: PayloadAction<string>) => {
      state.model = action.payload;
    },
  },
});

export type SearchPanelState = {
  name: string;
  model: string;
};

export default searchPanelSlice;
