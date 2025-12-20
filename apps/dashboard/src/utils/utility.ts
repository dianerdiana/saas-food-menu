import { appConfig } from '../configs/app.config';
import type { UserData } from '../types/user-data.type';
import { STORAGE_KEYS } from './constants/storage-keys';
import { USER_ROLES } from './constants/user-roles';

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat(appConfig.localCurrency, {
    style: 'currency',
    currency: appConfig.currency,
    minimumFractionDigits: 0,
  }).format(value);
};

export const formatThousandNumber = (value: number) => {
  return value.toLocaleString(appConfig.localCurrency);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isObjEmpty = (obj: any) => Object.keys(obj).length === 0;

export const capitalize = (text: string): string => {
  if (!text) return '';
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const getUserData = (): UserData => JSON.parse(localStorage.getItem(STORAGE_KEYS.userData) || '{}');
export const setUserData = (userData: UserData) =>
  localStorage.setItem(STORAGE_KEYS.userData, JSON.stringify(userData));

export const getHomeRouteForLoggedInUser = (role?: string) => {
  if (role && (role === USER_ROLES.admin || role === USER_ROLES.sale)) {
    return '/dashboard';
  }

  return '/signin';
};
