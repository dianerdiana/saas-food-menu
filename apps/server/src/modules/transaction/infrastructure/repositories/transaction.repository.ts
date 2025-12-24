import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionEntity } from '../../domain/entities/transaction.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private repository: Repository<TransactionEntity>,
  ) {}

  create(transaction: any) {
    return this.repository.create(transaction);
  }

  async save(transaction: TransactionEntity) {
    return this.repository.save(transaction);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findAll({ limit, skip }: PaginationDto) {
    return this.repository.findAndCount({
      take: limit,
      skip,
    });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
