import { AuthContext } from '@/components/Provider/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import { currentUser } from '@/apis/api';
import { getAccessToken } from '@/lib/cache';
import { useRouter } from 'next/router';
import { message } from 'antd';
import {
  IEventMessageData,
  msgChannel,
} from '@/lib/message-channels/msg.channel';
import {
  IEventRouterChannelData,
  routerChannel,
} from '@/lib/message-channels/router.channel';
import { onUnauthorized } from '@/lib/auth';
import LoadingSpinner from '@/components/SkeletonLoader/LoadingSpinner';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState<boolean>(true);

  const initialFetch = useCallback(async () => {
    try {
      if (!getAccessToken()) {
        messageApi.info('not login yet, now please login first');
        onUnauthorized();
        return;
      }

      const user = await currentUser();
      if (user) {
        setUser(user);
      }

      setLoading(false);
    } catch (err) {
      console.error('[AuthProvider] - initialFetch - err: %o', err);
    }
  }, []);

  useEffect(() => {
    initialFetch();
  }, []);

  useEffect(() => {
    msgChannel.port1.onmessage = ({ data }: IEventMessageData) => {
      const { type, msg } = data;
      // @ts-ignore
      messageApi[type](msg);
    };

    return () => {
      msgChannel.port1.onmessage = null;
    };
  }, []);

  useEffect(() => {
    routerChannel.port1.onmessage = ({ data }: IEventRouterChannelData) => {
      const { action, args, type } = data;
      // if (type === 'auth-replace') {
      //   const [url] = args;
      //   router.replace(url);
      //   return;
      // }

      // @ts-ignore
      router[action](...args);
    };

    return () => {
      routerChannel.port1.onmessage = null;
    };
  }, []);

  useEffect(() => {
    const onRouteChangeComplete = (url: string) => {
      router.events.off('routeChangeComplete', onRouteChangeComplete);
      setLoading(false);
    };

    router.events.on('routeChangeComplete', onRouteChangeComplete);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <>
        {contextHolder}
        {loading ? <LoadingSpinner /> : props.children}
      </>
    </AuthContext.Provider>
  );
}
