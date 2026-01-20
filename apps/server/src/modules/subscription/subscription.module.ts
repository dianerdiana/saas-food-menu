import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { SubscriptionEntity } from './domain/entities/subscription.entity';

// Repository
import { SubscriptionRepository } from './infrastructure/repositories/subscription.repository';

// Use Case
import { CreateSubscriptionUseCase } from './application/use-case/create-subscription.use-case';
import { DeleteSubscriptionUseCase } from './application/use-case/delete-subscription.use-case';
import { GetAllSubscriptionUseCase } from './application/use-case/get-all-subscription.use-case';
import { GetSubscriptionByIdUseCase } from './application/use-case/get-subscription-by-id.use-case';
import { UpdateSubscriptionUseCase } from './application/use-case/update-subscription.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [
    SubscriptionRepository,
    CreateSubscriptionUseCase,
    DeleteSubscriptionUseCase,
    GetAllSubscriptionUseCase,
    GetSubscriptionByIdUseCase,
    UpdateSubscriptionUseCase,
  ],
})
export class SubscriptionModule {}
