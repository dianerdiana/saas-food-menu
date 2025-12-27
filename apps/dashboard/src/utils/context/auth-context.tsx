import { createContext, useLayoutEffect, useState } from 'react';

import { jwt } from '@/configs/api.config';

type AuthContextType = {
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  signIn: (credentials: any) => Promise<any>;
  signUp: (credentials: any) => Promise<any>;
  signOut: () => void;
  userData: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<any | null>(null);
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

  const signIn = async (credentials: any) => {
    const response = await jwt.signIn(credentials);
    const { data } = response.data;

    jwt.setToken(data.accessToken);
    setUserData(data.userData);
    setIsInitialLoading(false);

    return response;
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
