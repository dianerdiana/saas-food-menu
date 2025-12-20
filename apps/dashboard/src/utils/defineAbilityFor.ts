import { createMongoAbility } from '@casl/ability';
import { USER_ROLES } from './constants/user-roles';

const adminRules = [
  { action: ['read'], subject: 'Dashboard' },
  { action: ['read'], subject: 'Auth' },
  { action: ['read', 'create', 'update', 'delete'], subject: 'User' },
  { action: ['read', 'create', 'update', 'delete'], subject: 'Customer' },
];

const saleRules = [
  { action: ['read'], subject: 'Dashboard' },
  { action: ['read'], subject: 'Auth' },
  { action: ['read'], subject: 'Customer' },
  { action: ['update'], subject: 'CustomerStatus' },
];

export const defineAbilityFor = (userRole: string) => {
  let rules = [{ action: ['read'], subject: 'Auth' }];

  if (userRole === USER_ROLES.admin) {
    rules = adminRules;
  } else if (userRole === USER_ROLES.sale) {
    rules = saleRules;
  }

  return createMongoAbility(rules, {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    detectSubjectType: (object: any) => object!.type,
  });
};
