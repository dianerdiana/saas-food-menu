import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(createTransactionDto: CreateTransactionDto, authUser: AuthUser) {}
}
