import { configureStore } from '@reduxjs/toolkit';
import deviceItemSlice, { DeviceItemState } from './DeviceItemSlice';
import deviceListSlice, { DeviceListState } from './DeviceListSlice';
import searchPanelSlice, { SearchPanelState } from './SearchPanelSlice';

export const store = configureStore({
  reducer: {
    deviceItem: deviceItemSlice.reducer,
    deviceList: deviceListSlice.reducer,
    searchPanel: searchPanelSlice.reducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export type TodoState = {
  deviceItem: DeviceItemState;
  deviceList: DeviceListState;
  searchPanel: SearchPanelState;
};
