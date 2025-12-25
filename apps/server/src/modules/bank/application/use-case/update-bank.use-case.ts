import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { BankModel } from '../../domain/models/bank.model';
import { UpdateBankDto } from '../dtos/update-bank.dto';

@Injectable()
export class UpdateBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(updateBankDto: UpdateBankDto, bankId: string) {
    const {} = updateBankDto;
    const bank = await this.bankRepository.findById(bankId);

    if (!bank) throw new NotFoundException('Bank is not found');

    await this.bankRepository.save(bank);
    return new BankModel(bank);
  }
}
