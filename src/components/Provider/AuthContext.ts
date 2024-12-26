import React, { useContext } from 'react';
import { API } from '@/types/typings';
import { MessageInstance } from 'antd/es/message/interface';

export interface AuthContextValue {
  user: API.User;
  setUser: (user: API.User) => void;
  messageApi: MessageInstance;
}

export const AuthContext = React.createContext<any>({});

export const useAuthContext = () => {
  const authContext: AuthContextValue = useContext(AuthContext);
  return { ...authContext, isLogin: !!authContext.user };
};
