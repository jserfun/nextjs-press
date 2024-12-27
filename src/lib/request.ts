import axios, { AxiosResponse } from 'axios';
import { getAccessToken } from './cache';
import { onUnauthorized } from './auth';
import { showMsg } from '@/lib/message-channels/msg.channel';
import { isString } from 'antd/es/button';

export interface PageQuery {
  current?: number;
  pageSize?: number;
}

export interface DateTimePageQuery extends PageQuery {
  beginTime?: string;
  endTime?: string;
}

export interface DateTimeQuery {
  beginTime?: string;
  endTime?: string;
}

// api 服务端api定义
export interface Result<T> {
  code: number;
  message: string;
  data?: T;
}

export interface PageResult<T> {
  /**
   * 结果列表
   */
  records: T[];
  /**
   * 总数
   */
  total: number;
  /**
   * 当前页数
   */
  current: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 是否有上一页
   */
  hasPrevious: boolean;
  /**
   * 是否有下一页
   */
  hasNext: boolean;
}

const isSuccess = (r: Result<any>) => r.code === 200;

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (getAccessToken()) {
      config.headers['Authorization'] = 'Bearer ' + getAccessToken();
    }

    return config;
  },
  (err) => Promise.reject(err)
);

class ResponseError extends Error {
  public readonly response: AxiosResponse;

  constructor(response: AxiosResponse, msg: string) {
    super(msg);
    this.response = response;
  }
}

axiosInstance.interceptors.response.use(
  // @ts-ignore
  (response) => {
    if (!response || !response.status) {
      return Promise.reject(
        new ResponseError(response, '网络异常，请检查您的网络')
      );
    }

    const contentType = response.headers['content-type'];

    if (isString(contentType)) {
      if (contentType.indexOf('application/octet-stream') > -1) {
        downloadFileFromResponse(response);
        return;
      }
    }

    if (response.status !== 200) {
      return Promise.reject(
        new ResponseError(
          response,
          `${response.status}: ${response.config.url}`
        )
      );
    }

    const result = response.data as Result<any>;

    if (!isSuccess(result)) {
      return Promise.reject(new ResponseError(response, result.message));
    }

    return result.data;
  },
  (error) => {
    const msg = !error
      ? '[Error None Message]'
      : typeof error === 'string'
        ? error
        : error.response
          ? error.response.data?.message || error.response.data?.msg
          : error.message
            ? error.message
            : '[Error Unknown Message]';

    showMsg({ type: 'error', msg });

    // TODO: log to the remote
    // method, url, error message
    console.error('response error: %o', error);

    if (error.response?.status === 401) {
      onUnauthorized();
    }

    return Promise.reject(error);
  }
);

export const request = {
  get<T = any>(url: string, params: Record<string, any> = {}): Promise<T> {
    return axiosInstance.get(url, {
      params,
    });
  },
  post<T = any>(url: string, data: Record<string, any> = {}): Promise<T> {
    return axiosInstance.post(url, data);
  },
  patch<T = any>(url: string, data: Record<string, any> = {}): Promise<T> {
    return axiosInstance.patch(url, data);
  },
  delete<T = any>(url: string, data: Record<string, any> = {}): Promise<T> {
    return axiosInstance.delete(url, { data });
  },
  download(url: string, params: Record<string, any> = {}): Promise<void> {
    return axiosInstance.get(url, {
      params,
      responseType: 'blob',
    });
  },
};

function downloadFileFromResponse(response: any) {
  const blob = response.data;
  const filename = response.headers['content-disposition']
    .split('filename=')
    .pop();

  const blobUrl = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.download = filename;
  a.href = blobUrl;

  document.body.appendChild(a);
  a.click();
  a.remove();

  URL.revokeObjectURL(blobUrl);
}
