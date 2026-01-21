import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRecommendationEntity } from './domain/entities/product-recommendation.entity';

import { ProductRecommendationRepository } from './infrastructure/repositories/product-recommendation.repository';

import { AssignProductRecommendationService } from './application/services/assign-product-recommendation.service';
import { GetProductRecommendationListService } from './application/services/get-product-recommendation-list.service';
import { DeleteProductRecommendationService } from './application/services/delete-product-recommendation.service';
import { GetProductRecommendationListByIdsService } from './application/services/get-product-recommendation-list-by-ids.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRecommendationEntity])],
  providers: [
    ProductRecommendationRepository,
    AssignProductRecommendationService,
    GetProductRecommendationListService,
    DeleteProductRecommendationService,
    GetProductRecommendationListByIdsService,
  ],
  exports: [
    AssignProductRecommendationService,
    GetProductRecommendationListService,
    DeleteProductRecommendationService,
    GetProductRecommendationListByIdsService,
  ],
})
export class ProductRecommendationModule {}
