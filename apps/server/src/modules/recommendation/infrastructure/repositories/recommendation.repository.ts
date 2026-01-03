import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { CreateRecommendationDto } from '../../application/dtos/create-recommendation.dto';

@Injectable()
export class RecommendationRepository {
  constructor(
    @InjectRepository(RecommendationEntity)
    private repository: Repository<RecommendationEntity>,
  ) {}

  create(recommendation: CreateRecommendationDto) {
    return this.repository.create(recommendation);
  }

  async bulkSave(recommendations: RecommendationEntity[]) {
    return await this.repository
      .createQueryBuilder()
      .insert()
      .into(RecommendationEntity)
      .values(recommendations)
      .execute();
  }
}
