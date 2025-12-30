import { createContext, useContext, useLayoutEffect, useState } from 'react';

import { jwt } from '@/configs/api.config';

import type { AxiosResponse } from 'axios';

import type { AbilityRule } from '@/types/ability-rule';
import type { ResponseApi } from '@/types/response-api.type';
import type { UserData } from '@/types/user-data.type';
import type { SignInModel } from '@/views/auth/models/signin.model';

import { createAbility } from '../create-mongo-ability';
import { handleErrorApi } from '../handle-error-api';
import { AbilityContext } from './ability-context';

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  signIn: (credentials: any) => Promise<AxiosResponse<ResponseApi<SignInModel>>>;
  signUp: (credentials: any) => Promise<AxiosResponse<ResponseApi<SignInModel>>>;
  signOut: () => void;
  changeStore: (storeId: string) => Promise<any>;
  userData: UserData;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const ability = useContext(AbilityContext);

  const updateAbility = (permissions: AbilityRule[]) => {
    const newAbility = createAbility(permissions);
    ability.update(newAbility.rules);
  };

  const silentRefresh = async () => {
    try {
      const response = await jwt.refreshToken();
      const { data } = response.data;

      updateAbility(data.userData.permissions);
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

      updateAbility(data.userData.permissions);
      jwt.setToken(data.accessToken);
      setUserData(data.userData);
      setIsInitialLoading(false);

      return response;
    } catch (error) {
      return handleErrorApi(error);
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

  const changeStore = async (storeId: string) => {
    try {
      const response = await jwt.changeStore(storeId);
      const { data } = response.data;

      updateAbility(data.userData.permissions);
      jwt.setToken(data.accessToken);
      setUserData(data.userData);
      setIsInitialLoading(false);

      return response;
    } catch (error) {
      return error;
    }
  };

  useLayoutEffect(() => {
    silentRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!userData,
        isInitialLoading,
        signIn,
        signUp,
        signOut,
        userData: userData
          ? userData
          : ({
              email: '',
              username: '',
              storeId: '',
              userId: '',
            } as UserData),
        changeStore,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
