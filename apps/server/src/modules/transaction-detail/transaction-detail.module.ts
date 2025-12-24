import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { TransactionDetailEntity } from './domain/entities/transaction-detail.entity';

// Repository
import { TransactionDetailRepository } from './infrastructure/repositories/transaction-detail.repository';

// Controller
import { TransactionDetailController } from './interface/controllers/transaction-detail.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDetailEntity])],
  controllers: [TransactionDetailController],
  providers: [TransactionDetailRepository],
})
export class TransactionDetailModule {}
