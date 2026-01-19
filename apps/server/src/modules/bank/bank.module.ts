// NestJS
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { BankEntity } from './domain/entities/bank.entity';

// Repository
import { BankRepository } from './infrastructure/repositories/bank.repository';

// Use Case
import { CreateBankUseCase } from './application/use-case/create-bank.use-case';
import { DeleteBankUseCase } from './application/use-case/delete-bank.use-case';
import { GetAllBankUseCase } from './application/use-case/get-all-bank.use-case';
import { GetBankByIdUseCase } from './application/use-case/get-bank-by-id.use-case';
import { UpdateBankUseCase } from './application/use-case/update-bank.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  controllers: [],
  providers: [
    BankRepository,
    CreateBankUseCase,
    DeleteBankUseCase,
    GetAllBankUseCase,
    GetBankByIdUseCase,
    UpdateBankUseCase,
  ],
})
export class BankModule {}
