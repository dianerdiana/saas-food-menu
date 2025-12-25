import { Injectable, NotFoundException } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { TransactionModel } from '../../domain/models/transaction.model';
import { UpdateTransactionDto } from '../dtos/update-transaction.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(updateTransactionDto: UpdateTransactionDto, transactionId: string, authUser: AuthUser) {
    const {} = updateTransactionDto;
    const transaction = await this.transactionRepository.findById(transactionId);

    if (!transaction) throw new NotFoundException('Transaction is not found');

    await this.transactionRepository.save(transaction);
    return new TransactionModel(transaction);
  }
}
