import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Device } from '../components/DeviceList';
import { fetchDevices } from '../../ApiRequest';

const deviceListSlice = createSlice({
  name: 'deviceList',
  initialState: {
    list: [] as Device[],
  },
  reducers: {
    setDeviceList: (state, action: PayloadAction<Device[]>) => {
      state.list = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchDevicesAsync.fulfilled, (state, action) => {
      state.list = action.payload;
    });
  },
});

export const fetchDevicesAsync = createAsyncThunk(
  'deviceList/fetchDevicesAsync',
  async (payload: { name?: string; model?: string }) => {
    const response = await fetchDevices(payload);
    return response.data;
  }
);

export const { setDeviceList } = deviceListSlice.actions;

export type DeviceListState = {
  list: Device[];
};

export default deviceListSlice;
