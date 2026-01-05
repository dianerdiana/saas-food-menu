import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationEntity } from './domain/entities/recommendation.entity';
import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';
import { InitializeDefaultRecommendationService } from './application/services/initialize-default-recommendation.service';

import { CreateRecommendationUseCase } from './application/use-case/create-recommendation.use-case';
import { DeleteRecommendationUseCase } from './application/use-case/delete-recommendation.use-case';
import { GetAllRecommendationUseCase } from './application/use-case/get-all-recommendation.use-case';
import { GetRecommendationByIdUseCase } from './application/use-case/get-recommendation-by-id.use-case';
import { UpdateRecommendationUseCase } from './application/use-case/update-recommendation.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationEntity])],
  providers: [
    RecommendationRepository,
    InitializeDefaultRecommendationService,
    CreateRecommendationUseCase,
    DeleteRecommendationUseCase,
    GetAllRecommendationUseCase,
    GetRecommendationByIdUseCase,
    UpdateRecommendationUseCase,
  ],
  exports: [InitializeDefaultRecommendationService],
})
export class RecommendationModule {}
