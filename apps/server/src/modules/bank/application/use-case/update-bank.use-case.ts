import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { BankModel } from '../../domain/models/bank.model';
import { UpdateBankDto } from '../dtos/update-bank.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(updateBankDto: UpdateBankDto, bankId: string, authUser: AuthUser) {
    const { account, name, number } = updateBankDto;

    const bank = await this.bankRepository.findById(bankId);
    if (!bank) throw new NotFoundException('Bank is not found');

    bank.account = account;
    bank.name = name;
    bank.number = number;
    bank.updatedBy = authUser.userId;

    await this.bankRepository.save(bank);

    return new BankModel(bank);
  }
}
