import { Injectable } from '@nestjs/common';
import { BankRepository } from '../../infrastructure/repositories/bank.repository';

@Injectable()
export class CreateBankUseCase {
  constructor(private bankRepository: BankRepository) {}
}
