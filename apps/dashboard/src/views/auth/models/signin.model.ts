import type { UserData } from '@/types/user-data.type';

export type SignInModel = {
  userData: UserData;
  accessToken: string;
};
