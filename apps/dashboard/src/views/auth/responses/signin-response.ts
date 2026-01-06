import type { UserData } from '@/types/user-data.type';

export type SignInResponse = {
  userData: UserData;
  accessToken: string;
};
