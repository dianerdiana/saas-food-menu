import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { SubscriptionEntity } from './domain/entities/subscription.entity';

// Repository
import { SubscriptionRepository } from './infrastructure/repositories/subscription.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  providers: [SubscriptionRepository],
})
export class SubscriptionModule {}
