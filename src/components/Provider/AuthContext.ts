import React, { useContext } from 'react';
import { API } from '@/types/api';

export interface AuthContextValue {
  user: API.User | null;
  setUser: (user: API.User | null) => void;
}

export const AuthContext = React.createContext<any>({});

export const useAuthContext = () => {
  const authContext: AuthContextValue = useContext(AuthContext);
  return { ...authContext, isLogin: !!authContext.user };
};
