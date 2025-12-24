import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { SubscriptionEntity } from './domain/entities/subscription.entity';

// Repository
import { SubscriptionRepository } from './infrastructure/repositories/subscription.repository';

// Controller
import { SubscriptionController } from './interface/controllers/subscription.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  controllers: [SubscriptionController],
  providers: [SubscriptionRepository],
})
export class SubscriptionModule {}
