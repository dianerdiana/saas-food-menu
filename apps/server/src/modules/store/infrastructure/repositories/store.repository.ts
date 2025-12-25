import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StoreEntity } from '../../domain/entities/store.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class StoreRepository {
  constructor(
    @InjectRepository(StoreEntity)
    private repository: Repository<StoreEntity>,
  ) {}

  create(store: Partial<StoreEntity>) {
    return this.repository.create(store);
  }

  async save(store: StoreEntity) {
    return this.repository.save(store);
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }

  async findByPhone(phone: string) {
    return this.repository.findOneBy({ phone });
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
