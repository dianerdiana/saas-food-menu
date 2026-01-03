import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationEntity } from './domain/entities/recommendation.entity';

import { BulkCreateDefaultRecommendationUseCase } from './application/use-cases/bluk-create-default-recommendation.use-case';

import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationEntity])],
  providers: [RecommendationRepository, BulkCreateDefaultRecommendationUseCase],
})
export class RecommendationModule {}
