import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { BankModel } from '../../domain/models/bank.model';

@Injectable()
export class GetBankByIdUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(id: string) {
    const bank = await this.bankRepository.findById(id);

    if (!bank) throw new NotFoundException('Bank not found');

    return new BankModel(bank);
  }
}
