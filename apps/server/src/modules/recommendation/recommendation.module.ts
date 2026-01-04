import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationEntity } from './domain/entities/recommendation.entity';

import { BulkCreateDefaultRecommendationUseCase } from './application/services/initialize-default-recommendation.service';

import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationEntity])],
  providers: [RecommendationRepository, BulkCreateDefaultRecommendationUseCase],
  exports: [BulkCreateDefaultRecommendationUseCase],
})
export class RecommendationModule {}
