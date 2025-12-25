import { Injectable, NotFoundException } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class DeleteBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(id: string, authUser: AuthUser) {
    const bank = await this.bankRepository.findById(id);
    if (!bank) throw new NotFoundException('Bank is not found');

    bank.deletedBy = authUser.userId;

    await this.bankRepository.save(bank);

    const updateResult = await this.bankRepository.deleteById(bank.id);

    return updateResult.affected && true;
  }
}
