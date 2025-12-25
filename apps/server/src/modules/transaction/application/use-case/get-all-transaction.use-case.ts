import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../infrastructure/repositories/transaction.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { TransactionModel } from '../../domain/models/transaction.model';

@Injectable()
export class GetAllTransactionUseCase {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.transactionRepository.findAll(paginationDto);
    const transactions = data.map((transaction) => new TransactionModel(transaction));

    const totalPages = Math.ceil(count / limit);

    return {
      transactions,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
