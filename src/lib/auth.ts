import { emitRouter } from '@/lib/message-channels/router.channel';
import { logout } from '../apis/api';
import { getAccessToken, removeAccessToken } from './cache';

export const onUnauthorized = async () => {
  try {
    if (getAccessToken()) {
      await logout();
      removeAccessToken();
    }

    emitRouter({ action: 'replace', args: ['/login'], type: 'auth-replace' });
  } catch (err) {
    console.error('[onUnauthorized] - err: %o', err);
  }
};

export const signin = async () => {};
