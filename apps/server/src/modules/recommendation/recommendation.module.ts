import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RecommendationEntity } from './domain/entities/recommendation.entity';
import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';

import { InitializeDefaultRecommendationService } from './application/services/initialize-default-recommendation.service';

import { CreateRecommendationUseCase } from './application/use-cases/create-recommendation.use-case';
import { DeleteRecommendationUseCase } from './application/use-cases/delete-recommendation.use-case';
import { GetRecommendationListUseCase } from './application/use-cases/get-recommendation-list.use-case';
import { GetRecommendationByIdUseCase } from './application/use-cases/get-recommendation-by-id.use-case';
import { UpdateRecommendationUseCase } from './application/use-cases/update-recommendation.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([RecommendationEntity])],
  providers: [
    RecommendationRepository,

    InitializeDefaultRecommendationService,
    CreateRecommendationUseCase,
    DeleteRecommendationUseCase,
    GetRecommendationListUseCase,
    GetRecommendationByIdUseCase,
    UpdateRecommendationUseCase,
  ],
  exports: [
    InitializeDefaultRecommendationService,
    CreateRecommendationUseCase,
    DeleteRecommendationUseCase,
    GetRecommendationListUseCase,
    GetRecommendationByIdUseCase,
    UpdateRecommendationUseCase,
  ],
})
export class RecommendationModule {}
