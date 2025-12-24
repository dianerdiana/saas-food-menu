import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { TransactionEntity } from './domain/entities/transaction.entity';

// Repository
import { TransactionRepository } from './infrastructure/repositories/transaction.repository';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [TransactionRepository],
})
export class TransactionModule {}
