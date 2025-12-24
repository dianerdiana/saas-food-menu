import { SetMetadata } from '@nestjs/common';
import { RequiredRule } from '../types/access-control.type';
import { CHECK_POLICIES_KEY } from '../constants/access-control.constant';

export const CheckPolicies = (...requirements: RequiredRule[]) => SetMetadata(CHECK_POLICIES_KEY, requirements);
