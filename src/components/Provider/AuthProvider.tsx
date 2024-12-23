import { AuthContext } from '@/components/Provider/AuthContext';
import React, { useEffect, useState } from 'react';
import { currentUser } from '@/apis/api';
import { getAccessToken, removeAccessToken } from '@/lib/cache';
import { useRouter } from 'next/router';

export interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider(props: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<any>();

  const initUser = async () => {
    try {
      const user = await currentUser();
      if (user) setUser(user);
    } catch (error) {
      removeAccessToken();
    }
  };

  useEffect(() => {
    if (getAccessToken()) {
      initUser();
      return;
    }

    console.log('auth - router: %o', router);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}
