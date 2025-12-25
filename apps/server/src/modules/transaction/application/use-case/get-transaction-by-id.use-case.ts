import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { TransactionModel } from '../../domain/models/transaction.model';

@Injectable()
export class GetTransactionByIdUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) throw new NotFoundException('Transaction not found');

    return new TransactionModel(transaction);
  }
}
