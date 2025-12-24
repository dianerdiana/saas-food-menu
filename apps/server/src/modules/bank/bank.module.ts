import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Entity
import { BankEntity } from './domain/entities/bank.entity';

// Repository
import { BankRepository } from './infrastructure/repositories/bank.repository';

// Controller
import { BankController } from './interface/controllers/bank.controller';

// Use Case

@Module({
  imports: [TypeOrmModule.forFeature([BankEntity])],
  controllers: [BankController],
  providers: [BankRepository],
})
export class BankModule {}
