import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductRecommendationEntity } from './domain/entities/product-recommendation.entity';

import { AssignProductRecommendationService } from './application/services/assign-product-recommendation.service';

import { ProductRecommendationRepository } from './infrastructure/repositories/product-recommendation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProductRecommendationEntity])],
  providers: [ProductRecommendationRepository, AssignProductRecommendationService],
  exports: [AssignProductRecommendationService],
})
export class ProductRecommendationModule {}
