import { createContext, useLayoutEffect, useState } from 'react';

import { jwt } from '@/configs/api.config';

import type { AxiosResponse } from 'axios';

import type { AuthUser } from '@/types/auth-user.type';
import type { ResponseApi } from '@/types/response-api.type';
import type { SignInModel } from '@/views/auth/models/signin.model';

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  signIn: (credentials: any) => Promise<AxiosResponse<ResponseApi<SignInModel>>>;
  signUp: (credentials: any) => Promise<AxiosResponse<ResponseApi<SignInModel>>>;
  signOut: () => void;
  userData: AuthUser | null;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<AuthUser | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const silentRefresh = async () => {
    try {
      const response = await jwt.refreshToken();
      const { data } = response.data;

      setUserData(data.userData);
      jwt.setToken(data.accessToken);
    } catch (error) {
      setUserData(null);
    } finally {
      setIsInitialLoading(false);
    }
  };

  const signIn = async (credentials: any): Promise<AxiosResponse<ResponseApi<SignInModel>> | any> => {
    try {
      const response = await jwt.signIn(credentials);
      const { data } = response.data;

      jwt.setToken(data.accessToken);
      setUserData(data.userData);
      setIsInitialLoading(false);

      return response;
    } catch (error) {
      return error;
    }
  };

  const signUp = async (credentials: any) => {
    const response = await jwt.signUp(credentials);
    const { data } = response.data;

    setIsInitialLoading(false);

    return data;
  };

  const signOut = async () => {
    await jwt.signOut();
    window.location.href = '/signin';
  };

  useLayoutEffect(() => {
    silentRefresh();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!userData, isInitialLoading, signIn, signUp, signOut, userData }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
