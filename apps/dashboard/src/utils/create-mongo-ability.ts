import { createMongoAbility } from '@casl/ability';

import type { AbilityRule } from '@/types/ability-rule';

export const createAbility = (rules: AbilityRule[]) =>
  createMongoAbility(rules, {
    detectSubjectType: (object: any) => object!.type,
  });
