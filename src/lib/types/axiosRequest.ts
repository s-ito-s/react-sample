import { GenericAbortSignal } from 'axios';

export type GetConfigTypes = {
  url: string;
  params?: Record<string, unknown> | URLSearchParams;
  signal: GenericAbortSignal;
};

export type PostConfigTypes = {
  url: string;
  data?: Record<string, unknown> | URLSearchParams;
  signal: GenericAbortSignal;
};

export type PutConfigTypes = {
  url: string;
  data: Record<string, unknown>;
  signal: GenericAbortSignal;
};

export type DeleteConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  signal: GenericAbortSignal;
};

export type PatchConfigTypes = {
  url: string;
  data?: Record<string, unknown>;
  signal: GenericAbortSignal;
};

export type AxiosRequest = {
  get<T = any>(params: GetConfigTypes): Promise<T>;
  post<T = any>(params: PostConfigTypes): Promise<T>;
  patch<T = any>(params: PatchConfigTypes): Promise<T>;
  put<T = any>(params: PutConfigTypes): Promise<T>;
  delete<T = any>(params: DeleteConfigTypes): Promise<T>;
};
