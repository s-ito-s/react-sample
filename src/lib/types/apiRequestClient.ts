import { ContentType } from '../utills/apiUtill';

export type GetConfigTypes = {
  url: string;
  params?: Record<string, unknown> | URLSearchParams;
  headers?: any;
  cancelable?: boolean;
};

export type PostConfigTypes = {
  url: string;
  data?: Record<string, unknown> | URLSearchParams;
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

export type PutConfigTypes = {
  url: string;
  data: Record<string, unknown>;
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

export type DeleteConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

export type PatchConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  headers?: any;
  cancelable?: boolean;
  contentType?: ContentType;
};

// URLとメソッド（GET, POST...）を渡してキャンセルするイメージ、cancelAllがfalseなら最新リクエスト、trueなら全て
export type CancelConfig = {
  url: string;
  method: string;
  // キャンセルする対象　最新/該当全て/全て　デフォルトは最新
  cancelType: 'recently' | 'targetAll' | 'all';
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
