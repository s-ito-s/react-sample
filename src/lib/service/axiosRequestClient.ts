import axios, { AxiosInstance, CreateAxiosDefaults } from 'axios';
import {
  GetConfigTypes,
  PostConfigTypes,
  PatchConfigTypes,
  PutConfigTypes,
  DeleteConfigTypes,
  ApiClientBase,
  CancelConfig,
} from '../types/apiRequestClient';
import {
  ContentType,
  convertParams,
  convertResponse,
  encode,
} from '../utills/apiUtill';

export class AxiosRequestClient implements ApiClientBase {
  private contentType: ContentType;
  private axiosInstance: AxiosInstance;

  constructor(config: {
    contentType: ContentType;
    axiosConfig: CreateAxiosDefaults;
  }) {
    this.contentType = config.contentType;
    this.axiosInstance = axios.create(config.axiosConfig);
  }

  cancelRequests(param: CancelConfig): Boolean {
    // いい感じにリクエストを管理する
    throw new Error('Method not implemented.');
  }

  manageRequest() {
    // いい感じにリクエストを管理する
  }

  async get<T = any>({
    url,
    params,
    headers,
    cancelable = false,
  }: GetConfigTypes): Promise<T> {
    try {
      // cancelableがtrueだったらキャンセルトークンを作る
      const response = await this.axiosInstance.request({
        method: 'GET',
        url,
        params: convertParams(params),
        headers,
      });
      return convertResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  async post<T = any>({
    url,
    data,
    headers,
    cancelable = false,
    contentType = this.contentType,
  }: PostConfigTypes): Promise<T> {
    try {
      // cancelableがtrueだったらキャンセルトークンを作る
      const response = await this.axiosInstance.request({
        method: 'POST',
        url,
        params: encode(contentType, convertParams(data)),
        headers,
      });
      return convertResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  async patch<T = any>({
    url,
    data,
    headers,
    cancelable = false,
    contentType = this.contentType,
  }: PatchConfigTypes): Promise<T> {
    try {
      // cancelableがtrueだったらキャンセルトークンを作る
      const response = await this.axiosInstance.request({
        method: 'PATCH',
        url,
        params: encode(contentType, convertParams(data)),
        headers,
      });
      return convertResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  async put<T = any>({
    url,
    data,
    headers,
    cancelable = false,
    contentType = this.contentType,
  }: PutConfigTypes): Promise<T> {
    try {
      // cancelableがtrueだったらキャンセルトークンを作る
      const response = await this.axiosInstance.request({
        method: 'PUT',
        url,
        params: encode(contentType, convertParams(data)),
        headers,
      });
      return convertResponse(response.data);
    } catch (error) {
      throw error;
    }
  }

  async delete<T = any>({
    url,
    data,
    headers,
    cancelable = false,
    contentType = this.contentType,
  }: DeleteConfigTypes): Promise<T> {
    try {
      // cancelableがtrueだったらキャンセルトークンを作る
      const response = await this.axiosInstance.request({
        method: 'DELETE',
        url,
        params: encode(contentType, convertParams(data)),
        headers,
      });
      return convertResponse(response.data);
    } catch (error) {
      throw error;
    }
  }
}
