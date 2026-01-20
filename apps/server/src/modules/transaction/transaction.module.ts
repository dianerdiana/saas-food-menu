import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { TransactionEntity } from './domain/entities/transaction.entity';

// Repository
import { TransactionRepository } from './infrastructure/repositories/transaction.repository';

// Use Case
import { CreateTransactionUseCase } from './application/use-case/create-transaction.use-case';
import { DeleteTransactionUseCase } from './application/use-case/delete-transaction.use-case';
import { GetAllTransactionUseCase } from './application/use-case/get-all-transaction.use-case';
import { GetTransactionByIdUseCase } from './application/use-case/get-transaction-by-id.use-case';
import { UpdateTransactionUseCase } from './application/use-case/update-transaction.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  providers: [
    TransactionRepository,
    CreateTransactionUseCase,
    DeleteTransactionUseCase,
    GetAllTransactionUseCase,
    GetTransactionByIdUseCase,
    UpdateTransactionUseCase,
  ],
})
export class TransactionModule {}
