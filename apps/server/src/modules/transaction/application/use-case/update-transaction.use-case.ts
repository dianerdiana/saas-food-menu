import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { TransactionModel } from '../../domain/models/transaction.model';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(updateTransactionDto: UpdateTransactionDto, transactionId: string) {
    const {} = updateTransactionDto;
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) throw new NotFoundException('Transaction is not found');

    await this.transactionRepository.save(transaction);
    return new TransactionModel(transaction);
  }
}
