import { logout } from '../apis/api';
import { removeAccessToken } from './cache';

export const onUnauthorized = async () => {
  try {
    await logout();
  } catch (err) {
    return;
  }

  removeAccessToken();
  location.href = '/login';
};

export const signin = async () => {};
