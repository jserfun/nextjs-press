import { ACCESS_TOKEN } from '@/config/constants';

/**
 * 从 Cookie 中获取 accessToken
 */
export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

/**
 * 把 accessToken 存储到 Cookie, 15 天后失效
 * @param accessToken
 */
export function setAccessToken(accessToken: string) {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
}

/**
 * 将 Cookie 中的 accessToken 移除
 */
export function removeAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN);
}
