import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { TransactionDetailEntity } from './domain/entities/transaction-detail.entity';

// Repository
import { TransactionDetailRepository } from './infrastructure/repositories/transaction-detail.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionDetailEntity])],
  providers: [TransactionDetailRepository],
})
export class TransactionDetailModule {}
