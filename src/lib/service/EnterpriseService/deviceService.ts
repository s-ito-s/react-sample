import { Device } from '../../../sample-useState/components/DeviceList';
import { EnterpriseRequest } from './EnterpriseRequest';

interface DeviceService {
  fetchDevices(searchParam: {
    name?: string;
    model?: string;
  }): Promise<Device[]>;
  fetchDevicesDelay(searchParam: {
    name?: string;
    model?: string;
  }): Promise<Device[]>;
  registerDevice(name: string, model: string): Promise<any>;
  registerDeviceDelay(name: string, model: string): Promise<any>;
  updateDevice(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    }
  ): Promise<any>;
  updateDeviceDelay(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    }
  ): Promise<any>;
  deleteDevice(id: string): Promise<any>;
  deleteDeviceDelay(id: string): Promise<any>;
}

export class DeviceServiceRequests
  extends EnterpriseRequest
  implements DeviceService
{
  async fetchDevices(searchParam: {
    name?: string;
    model?: string;
  }): Promise<any> {
    return await this.apiClient.get({
      url: '/devices',
      params: searchParam,
    });
  }

  async fetchDevicesDelay(searchParam: {
    name?: string;
    model?: string;
  }): Promise<any> {
    return await this.apiClient.get({
      url: '/delay/devices',
      params: searchParam,
    });
  }

  async registerDevice(name: string, model: string): Promise<any> {
    return await this.apiClient.post({
      url: '/device',
      data: {
        name,
        model,
      },
    });
  }

  async registerDeviceDelay(name: string, model: string): Promise<any> {
    return await this.apiClient.post({
      url: '/delay/device',
      data: {
        name,
        model,
      },
    });
  }

  async updateDevice(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    }
  ): Promise<any> {
    return await this.apiClient.put({
      url: '/device/' + id,
      data: updateParam,
    });
  }

  async updateDeviceDelay(
    id: string,
    updateParam: {
      name?: string;
      model?: string;
    }
  ): Promise<any> {
    return await this.apiClient.put({
      url: '/delay/device/' + id,
      data: updateParam,
    });
  }

  async deleteDevice(id: string): Promise<any> {
    return await this.apiClient.delete({ url: '/device/' + id });
  }

  async deleteDeviceDelay(id: string): Promise<any> {
    return await this.apiClient.delete({
      url: '/delay/device/' + id,
    });
  }
}
