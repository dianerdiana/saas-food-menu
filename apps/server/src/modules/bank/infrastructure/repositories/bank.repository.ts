import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BankEntity } from '../../domain/entities/bank.entity';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class BankRepository {
  constructor(
    @InjectRepository(BankEntity)
    private repository: Repository<BankEntity>,
  ) {}

  create(bank: any) {
    return this.repository.create(bank);
  }

  async save(bank: BankEntity) {
    return this.repository.save(bank);
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
