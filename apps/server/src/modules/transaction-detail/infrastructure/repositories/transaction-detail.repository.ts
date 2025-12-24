import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransactionDetailEntity } from '../../domain/entities/transaction-detail.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class TransactionDetailRepository {
  constructor(
    @InjectRepository(TransactionDetailEntity)
    private repository: Repository<TransactionDetailEntity>,
  ) {}

  create(transactionDetail: any) {
    return this.repository.create(transactionDetail);
  }

  async save(transactionDetail: TransactionDetailEntity) {
    return this.repository.save(transactionDetail);
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
