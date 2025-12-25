import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}
}
