import { AuthContext } from '@/components/Provider/AuthContext';
import React, { useCallback, useEffect, useState } from 'react';
import { currentUser } from '@/apis/api';
import { getAccessToken } from '@/lib/cache';
import { useRouter } from 'next/router';
import { message } from 'antd';
import {
  IEventMessageData,
  IMessageData,
  messageChannel1,
} from '@/lib/message-channel';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [messageApi, contextHolder] = message.useMessage();

  const initUser = useCallback(async () => {
    if (!getAccessToken()) {
      return;
    }

    const user = await currentUser();
    if (user) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    initUser();
  }, []);

  useEffect(() => {
    messageChannel1.port1.onmessage = ({ data }: IEventMessageData) => {
      const { type, msg } = data;
      // @ts-ignore
      messageApi[type](msg);
    };

    return () => {
      messageChannel1.port1.onmessage = null;
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, messageApi }}>
      <>
        {contextHolder}
        {props.children}
      </>
    </AuthContext.Provider>
  );
}
