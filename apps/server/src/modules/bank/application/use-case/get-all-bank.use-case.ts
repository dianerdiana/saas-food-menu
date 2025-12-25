import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { BankModel } from '../../domain/models/bank.model';

@Injectable()
export class GetAllBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.bankRepository.findAll(paginationDto);
    const banks = data.map((bank) => new BankModel(bank));

    const totalPages = Math.ceil(count / limit);

    return {
      banks,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
