import axios from 'axios';
import cookie from 'cookie';
import qs from 'qs';
import {
  AxiosRequest,
  GetConfigTypes,
  PostConfigTypes,
  PatchConfigTypes,
  PutConfigTypes,
  DeleteConfigTypes,
} from '../types/axiosRequest';

const DEFAULT_CONTENT_TYPE = 'application/json';
const DEFAULT_TIMEOUT = 200000;
const XSRF_HEADER_NAME = 'X-XSRFTOKEN';
const XSRF_COOKIE_NAME = '_xsrf';

// entranceAxiosRequest, managerEntranceRequestなど各サービスでカスタマイズして複数作成する想定
export class CustomAxiosRequest implements AxiosRequest {
  defaultParams = {
    xsrfHeaderName: XSRF_HEADER_NAME,
    xsrfCookieName: XSRF_COOKIE_NAME,
    withCredentials: true,
    baseURL: process.env.apiHost,
    headers: {
      'Content-Type': DEFAULT_CONTENT_TYPE,
    },
    timeout: DEFAULT_TIMEOUT,
    paramsSerializer: {
      serialize: (params: any) => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      },
    },
  };

  apiRequest = axios.create(this.defaultParams);

  async fetchXSRFToken() {
    const cookies = cookie.parse(document.cookie);
    if ('_xsrf' in cookies) return;
    return await this.apiRequest.request({
      method: 'GET',
      url: '/enterprise/authorize',
    });
  }

  async get<T = any>({ url, params, signal }: GetConfigTypes): Promise<T> {
    return await this.apiRequest
      .request({
        method: 'GET',
        url,
        params,
        signal,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async post<T = any>({ url, data }: PostConfigTypes): Promise<T> {
    // serviceによって必要ならToken取得処理を挟む
    // await this.fetchXSRFToken()
    return await this.apiRequest
      .request({
        method: 'POST',
        url,
        data,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async put<T = any>({ url, data }: PutConfigTypes): Promise<T> {
    return await this.apiRequest
      .request({
        method: 'PUT',
        url,
        data,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async delete<T = any>({ url, data }: DeleteConfigTypes): Promise<T> {
    return await this.apiRequest
      .request({
        method: 'DELETE',
        url,
        data,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }

  async patch<T = any>({ url, data }: PatchConfigTypes): Promise<T> {
    return await this.apiRequest
      .request({
        method: 'PATCH',
        url,
        data,
      })
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  }
}
