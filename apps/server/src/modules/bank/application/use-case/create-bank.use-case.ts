import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';
import { CreateBankDto } from '../dtos/create-bank.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateBankUseCase {
  constructor(private bankRepository: BankRepository) {}

  async execute(createBankDto: CreateBankDto, authUser: AuthUser) {}
}
