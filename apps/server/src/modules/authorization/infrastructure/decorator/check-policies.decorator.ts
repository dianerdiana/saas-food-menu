import { SetMetadata } from '@nestjs/common';

import { AppAbility } from '../factories/casl-ability.factory';

import { CHECK_POLICIES_KEY } from '@/shared/constants/access-control.constant';

export type PolicyHandler = (ability: AppAbility) => boolean;
export const CheckPolicies = (...requirements: PolicyHandler[]) => SetMetadata(CHECK_POLICIES_KEY, requirements);
