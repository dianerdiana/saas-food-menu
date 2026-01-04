import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationEntity } from './domain/entities/recommendation.entity';

import { InitializeDefaultRecommendationService } from './application/services/initialize-default-recommendation.service';

import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationEntity])],
  providers: [RecommendationRepository, InitializeDefaultRecommendationService],
  exports: [InitializeDefaultRecommendationService],
})
export class RecommendationModule {}
