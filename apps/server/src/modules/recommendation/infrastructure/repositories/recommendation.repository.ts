import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { In, Repository } from 'typeorm';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';

import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class RecommendationRepository {
  constructor(
    @InjectRepository(RecommendationEntity)
    private repository: Repository<RecommendationEntity>,
  ) {}

  create(recommendation: Partial<RecommendationEntity>) {
    return this.repository.create(recommendation);
  }

  async save(recommendation: RecommendationEntity) {
    return this.repository.save(recommendation);
  }

  async bulkSave(recommendations: RecommendationEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(RecommendationEntity)
      .values(recommendations)
      .execute();
  }

  async findByIdAndStoreId(id: string, storeId: string) {
    return this.repository.findOneBy({ id, storeId });
  }

  async findAllByStoreId({ limit, skip, search }: PaginationDto, storeId: string) {
    const query = this.repository.createQueryBuilder('recommendation');

    query
      .leftJoinAndSelect('recommendation.productRecommendations', 'productRecommendation')
      .leftJoinAndSelect('productRecommendation.product', 'product', 'product.deleted_at IS NULL');

    if (search) {
      query.andWhere('(recommendation.name ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    query.andWhere('recommendation.store_id=:store_id', { store_id: storeId }).take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async findById(id: string) {
    return this.repository.findOneBy({ id });
  }

  async findAll({ limit, skip, search }: PaginationDto) {
    const query = this.repository.createQueryBuilder('recommendation');

    query
      .leftJoinAndSelect('recommendation.productRecommendations', 'productRecommendation')
      .leftJoinAndSelect('productRecommendation.product', 'product', 'product.deleted_at IS NULL');

    if (search) {
      query.andWhere('(recommendation.name ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    query.take(limit).skip(skip);

    return query.getManyAndCount();
  }

  async countAllOwned(storeId: string) {
    return this.repository.countBy({ storeId });
  }

  async countByIdsAndStoreId(ids: string[], storeId: string) {
    return this.repository.countBy({ id: In(ids), storeId });
  }

  async deleteById(id: string) {
    return this.repository.softDelete({ id });
  }
}
