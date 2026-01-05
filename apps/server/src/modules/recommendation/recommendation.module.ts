import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthorizationModule } from '../authorization/authorization.module';
import { ProductRecommendationModule } from '../product-recommendation/product-recommendation.module';
import { ProductModule } from '../product/product.module';

import { RecommendationEntity } from './domain/entities/recommendation.entity';
import { RecommendationRepository } from './infrastructure/repositories/recommendation.repository';
import { RecommendationController } from './interface/controllers/recommendation.controller';

import { InitializeDefaultRecommendationService } from './application/services/initialize-default-recommendation.service';

import { CreateRecommendationUseCase } from './application/use-case/create-recommendation.use-case';
import { DeleteRecommendationUseCase } from './application/use-case/delete-recommendation.use-case';
import { GetAllRecommendationUseCase } from './application/use-case/get-all-recommendation.use-case';
import { GetRecommendationByIdUseCase } from './application/use-case/get-recommendation-by-id.use-case';
import { UpdateRecommendationUseCase } from './application/use-case/update-recommendation.use-case';

@Module({
  imports: [
    TypeOrmModule.forFeature([RecommendationEntity]),
    AuthorizationModule,
    ProductRecommendationModule,
    ProductModule,
  ],
  controllers: [RecommendationController],
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
