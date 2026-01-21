import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { StoreEntity } from '../../domain/entities/store.entity';

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

  async findAll({ limit, skip, search }: PaginationDto) {
    const query = this.repository.createQueryBuilder('store');

    if (search) {
      query.andWhere('(store.name ILIKE :search or store.slug ILIKE :search)', { search: `%${search}%` });
    }

    query.take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async findAllOwned({ limit, skip, search }: PaginationDto, userId: string) {
    const query = this.repository.createQueryBuilder('store');

    if (search) {
      query.andWhere('(store.name ILIKE :search or store.slug ILIKE :search)', { search: `%${search}%` });
    }

    query.andWhere('store.owner_id=:user_id', { user_id: userId }).take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findByIds(ids: string[]) {
    return this.repository.createQueryBuilder('store').where('store.id IN (:...ids)', { ids }).getMany();
  }

  async findBySlug(slug: string) {
    return this.repository.findOneBy({ slug });
  }

  async findByPhone(phone: string) {
    return this.repository.findOneBy({ phone });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }

  async countAllOwned(userId: string) {
    return this.repository.countBy({ ownerId: userId });
  }
}
