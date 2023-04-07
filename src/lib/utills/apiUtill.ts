export const convertParams = (params: any) => {
  // 引数のパラメータ変換処理
  return params;
};

export const convertResponse = (params: any) => {
  // レスポンスのパラメータ変換処理
  return params;
};

type UnknownObject = { [property: string]: unknown };

export type ContentType =
  | 'application/json'
  | 'application/x-www-form-urlencoded';

export const encode = (contentType?: ContentType, data?: UnknownObject) => {
  switch (contentType) {
    case 'application/x-www-form-urlencoded':
      return urlEncode(data);
    default:
      // 'application/json'
      return JSON.stringify(data);
  }
};

export const urlEncode = (data?: UnknownObject) => {
  const params = new URLSearchParams();
  if (data) {
    for (const key in data) {
      if (data.hasOwnProperty(key) != null) {
        const element = data[key];
        params.append(key, String(element));
      }
    }
  }
  return params;
};
