import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { SubscriptionPaymentEntity } from './domain/entities/subscription-payment.entity';

// Repository
import { SubscriptionPaymentRepository } from './infrastructure/repositories/subscription-payment.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPaymentEntity])],
  providers: [SubscriptionPaymentRepository],
})
export class SubscriptionPaymentModule {}
