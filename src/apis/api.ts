import { getAccessToken } from '@/lib/cache';
import { PageResult, request } from '@/lib/request';
import { API } from '@/types/typings';

/** 获取当前的用户 GET /user/currentUser */
export async function currentUser() {
  return request.post('/auth/profile');
}

/** 登录接口 POST /login/list */
export async function login(body: API.LoginParams) {
  return request.post(`/auth/login`, body);
}

/** 退出登录接口 POST /login/outLogin */
export async function logout() {
  return request.post('/auth/logout', { accessToken: getAccessToken() });
}

export async function getCaptchaImage(params: Partial<API.CaptchaParams>) {
  return request.post('/captcha/image', params);
}

export async function getFakeSmsCaptcha(params: Partial<API.CaptchaParams>) {
  return request.post('/captcha/sms', params);
}

export async function updateUser(params: Partial<API.User>) {
  return request.patch('/user/update', params);
}

export async function addUser(params: Partial<API.User>) {
  return request.post('/user/save', params);
}

export async function removeUser(params: { ids: number[] }) {
  return request.delete('/user/delete', params);
}

export async function fetchUserPage(params: {
  /** 当前的页码 */
  current?: number;
  /** 页面的容量 */
  pageSize?: number;
  /** 任务名称 */
  name?: string;
}) {
  return request.get<PageResult<API.User>>('/user/page', params);
}
