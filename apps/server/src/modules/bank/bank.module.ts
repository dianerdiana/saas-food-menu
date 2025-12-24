import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { BankEntity } from './domain/entities/bank.entity';

// Repository
import { BankRepository } from './infrastructure/repositories/bank.repository';

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  providers: [BankRepository],
})
export class BankModule {}
