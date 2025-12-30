import type { AbilityRule } from './ability-rule';

export type UserData = {
  userId: string;
  fullName: string;
  email: string;
  username: string;
  storeId: string;
  roles: string[];
  permissions: AbilityRule[];
};
