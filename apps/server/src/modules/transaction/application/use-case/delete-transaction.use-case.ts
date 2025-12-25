import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';

@Injectable()
export class DeleteTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(id: string) {
    const transaction = await this.transactionRepository.findById(id);

    if (!transaction) throw new NotFoundException('Transaction is not found');
    const updateResult = await this.transactionRepository.deleteById(transaction.id);
    return updateResult.affected && true;
  }
}
