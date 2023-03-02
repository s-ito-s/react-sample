import { GenericAbortSignal } from 'axios';
import { Device } from '../../sample-useState/components/DeviceList';
import { AxiosRequest } from '../types/axiosRequest';

type DeviceService = {
  fetchDevices(
    searchParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<Device[]>;
  fetchDevicesDelay(
    searchParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<Device[]>;
  registerDevice(
    name: string,
    model: string,
    signal: GenericAbortSignal
  ): Promise<any>;
  registerDeviceDelay(
    name: string,
    model: string,
    signal: GenericAbortSignal
  ): Promise<any>;
  updateDevice(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any>;
  updateDeviceDelay(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any>;
  deleteDevice(id: string, signal: GenericAbortSignal): Promise<any>;
  deleteDeviceDelay(id: string, signal: GenericAbortSignal): Promise<any>;
};

export class DeviceServiceRequests implements DeviceService {
  private axiosInstance: AxiosRequest;

  constructor(axiosInstance: AxiosRequest) {
    this.axiosInstance = axiosInstance;
  }

  async fetchDevices(
    searchParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.get({
      url: '/devices',
      params: searchParam,
      signal,
    });
  }

  async fetchDevicesDelay(
    searchParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.get({
      url: '/delay/devices',
      params: searchParam,
      signal,
    });
  }

  async registerDevice(
    name: string,
    model: string,
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.post({
      url: '/device',
      data: {
        name,
        model,
      },
      signal,
    });
  }

  async registerDeviceDelay(
    name: string,
    model: string,
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.post({
      url: '/delay/device',
      data: {
        name,
        model,
      },
      signal,
    });
  }

  async updateDevice(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.put({
      url: '/device/' + id,
      data: updateParam,
      signal,
    });
  }

  async updateDeviceDelay(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    },
    signal: GenericAbortSignal
  ): Promise<any> {
    return await this.axiosInstance.put({
      url: '/delay/device/' + id,
      data: updateParam,
      signal,
    });
  }

  async deleteDevice(id: string, signal: GenericAbortSignal): Promise<any> {
    return await this.axiosInstance.delete({ url: '/device/' + id, signal });
  }

  async deleteDeviceDelay(id: string, signal: GenericAbortSignal): Promise<any> {
    return await this.axiosInstance.delete({ url: '/delay/device/' + id, signal });
  }
}
