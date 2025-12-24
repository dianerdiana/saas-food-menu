import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { SubscriptionPaymentEntity } from './domain/entities/subscription-payment.entity';

// Repository
import { SubscriptionPaymentRepository } from './infrastructure/repositories/subscription-payment.repository';

// Controller
import { SubscriptionPaymentController } from './interface/controllers/subscription-payment.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionPaymentEntity])],
  controllers: [SubscriptionPaymentController],
  providers: [SubscriptionPaymentRepository],
})
export class SubscriptionPaymentModule {}
