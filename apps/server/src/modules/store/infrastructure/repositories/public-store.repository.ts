import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { StoreEntity } from '../../domain/entities/store.entity';

@Injectable()
export class PublicStoreRepository {
  constructor(
    @InjectRepository(StoreEntity)
    private repository: Repository<StoreEntity>,
  ) {}

  findBySlugWithRelation(slug: string, includes?: string[]) {
    const query = this.repository.createQueryBuilder('store').where('store.slug=:slug', { slug });

    return query.getRawMany();
  }
}
