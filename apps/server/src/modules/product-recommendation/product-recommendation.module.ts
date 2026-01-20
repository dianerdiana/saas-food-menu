import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRecommendationEntity } from './domain/entities/product-recommendation.entity';

import { ProductRecommendationRepository } from './infrastructure/repositories/product-recommendation.repository';

import { AssignProductRecommendationService } from './application/services/assign-product-recommendation.service';
import { GetProductRecommendationListService } from './application/services/get-product-recommendation-list.service';
import { DeleteProductRecommendationService } from './application/services/delete-product-recommendation.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRecommendationEntity])],
  providers: [
    ProductRecommendationRepository,
    AssignProductRecommendationService,
    GetProductRecommendationListService,
    DeleteProductRecommendationService,
  ],
  exports: [
    AssignProductRecommendationService,
    GetProductRecommendationListService,
    DeleteProductRecommendationService,
  ],
})
export class ProductRecommendationModule {}
