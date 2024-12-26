import axios from 'axios';
import { getAccessToken } from './cache';
import { useRouter } from 'next/router';
import { message } from 'antd';
import { onUnauthorized } from './auth';

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

axiosInstance.interceptors.response.use(
  // @ts-ignore
  (response) => {
    if (!response || !response.status) {
      return Promise.reject('网络异常，请检查您的网络');
    }

    if (response.status !== 200) {
      return Promise.reject(`${response.status}: ${response.config.url}`);
    }

    const result = response.data as Result<any>;

    if (!isSuccess(result)) {
      return Promise.reject(`${result.message}`);
    }

    return result.data;
  },
  (error) => {
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
};
