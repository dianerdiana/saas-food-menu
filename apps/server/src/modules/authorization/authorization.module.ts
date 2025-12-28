import { Module } from '@nestjs/common';

import { UserModule } from '../user/user.module';

import { CaslAbilityFactory } from './infrastructure/factories/casl-ability.factory';
import { PoliciesGuard } from './infrastructure/guards/policies.guard';

import { BuildAbilityUseCase } from './application/use-cases/build-ability.use-case';

@Module({
  imports: [UserModule],
  providers: [CaslAbilityFactory, BuildAbilityUseCase, PoliciesGuard],
  exports: [BuildAbilityUseCase, PoliciesGuard],
})
export class AuthorizationModule {}
