import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { StoreEntity } from '../../domain/entities/store.entity';

const RELATIONS = ['product', 'recommendation'];

@Injectable()
export class BffStoreRepository {
  constructor(
    @InjectRepository(StoreEntity)
    private repository: Repository<StoreEntity>,
  ) {}

  findBySlugWithRelation(slug: string, includes?: string[]) {
    const query = this.repository
      .createQueryBuilder('store')
      .select([
        'store.id AS store_id',
        'store.name AS store_name',
        'store.slug AS store_slug',
        'store.image AS store_image',
        'store.address AS store_address',
      ])
      .leftJoinAndSelect('store.recommendations', 'recommendation')
      .leftJoinAndSelect('recommendation.productRecommendations', 'productRecommendation')
      .leftJoinAndSelect('productRecommendation.product', 'product')
      .where('store.slug=:slug', { slug });

    return query.getRawMany();
  }
}
