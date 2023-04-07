// APIの最上位毎に作るクラス、トークン取得処理などを行う。
import {
  ApiClientBase,
  DeleteConfigTypes,
  GetConfigTypes,
  PatchConfigTypes,
  PostConfigTypes,
  PutConfigTypes,
} from '../../types/apiRequestClient';

export class EnterpriseRequest {
  protected apiClient: ApiClientBase;

  constructor(client: ApiClientBase) {
    this.apiClient = client;
  }

  async get<T = any>(params: GetConfigTypes): Promise<T> {
    return await this.apiClient.get(params);
  }

  async post<T = any>(params: PostConfigTypes): Promise<T> {
    // トークン取得処理を書く
    return await this.apiClient.post(params);
  }

  async patch<T = any>(params: PatchConfigTypes): Promise<T> {
    return await this.apiClient.patch(params);
  }

  async put<T = any>(params: PutConfigTypes): Promise<T> {
    return await this.apiClient.put(params);
  }

  async delete<T = any>(params: DeleteConfigTypes): Promise<T> {
    return await this.apiClient.delete(params);
  }
}
