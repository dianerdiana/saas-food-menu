import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';

@Injectable()
export class DeleteBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(id: string) {
    const bank = await this.bankRepository.findById(id);

    if (!bank) throw new NotFoundException('Bank is not found');
    const updateResult = await this.bankRepository.deleteById(bank.id);
    return updateResult.affected && true;
  }
}
