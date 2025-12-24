import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { TransactionEntity } from './domain/entities/transaction.entity';

// Repository
import { TransactionRepository } from './infrastructure/repositories/transaction.repository';

// Controller
import { TransactionController } from './interface/controllers/transaction.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([TransactionEntity])],
  controllers: [TransactionController],
  providers: [TransactionRepository],
})
export class TransactionModule {}
