import { ContentType } from '../utills/apiUtill';

export type GetConfigTypes = {
  url: string;
  params?: Record<string, unknown> | URLSearchParams;
  headers?: any;
  getToken?: () => {};
};

export type PostConfigTypes = {
  url: string;
  data?: Record<string, unknown> | URLSearchParams;
  headers?: any;
  getToken?: () => {};
  contentType?: ContentType;
};

export type PutConfigTypes = {
  url: string;
  data: Record<string, unknown>;
  headers?: any;
  getToken?: () => {};
  contentType?: ContentType;
};

export type DeleteConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  headers?: any;
  getToken?: () => {};
  contentType?: ContentType;
};

export type PatchConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  headers?: any;
  getToken?: () => {};
  contentType?: ContentType;
};

// URLとメソッド（GET, POST...）を渡してキャンセルするイメージ、cancelAllがfalseなら最新リクエスト、trueなら全て
// 別案としてコンポーネント側からキャンセルするリクエストのID配列を渡す案もあり
export type CancelConfig = {
  url: string;
  method: string;
  cancelAll: boolean;
};

// export type CancelConfig = {
//   requestIds: string[];
// }

export interface ApiClientBase {
  get<T = any>(params: GetConfigTypes): Promise<T>;
  post<T = any>(params: PostConfigTypes): Promise<T>;
  patch<T = any>(params: PatchConfigTypes): Promise<T>;
  put<T = any>(params: PutConfigTypes): Promise<T>;
  delete<T = any>(params: DeleteConfigTypes): Promise<T>;
  cancelRequests(param: CancelConfig): Boolean;
}
