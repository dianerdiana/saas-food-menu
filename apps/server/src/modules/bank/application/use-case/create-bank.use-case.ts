import { BadRequestException, Injectable } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { BankModel } from '../../domain/models/bank.model';
import { CreateBankDto } from '../dtos/create-bank.dto';
import { AuthUser } from '@/shared/types/auth-user.type';
import { BankStatus } from '@/shared/enums/bank-status.enum';

@Injectable()
export class CreateBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(createBankDto: CreateBankDto, authUser: AuthUser) {
    if (!authUser.storeId) throw new BadRequestException("You don't have a shop yet");

    const bank = this.bankRepository.create({ ...createBankDto, storeId: authUser.storeId, status: BankStatus.Active });
    await this.bankRepository.save(bank);

    return new BankModel(bank);
  }
}
