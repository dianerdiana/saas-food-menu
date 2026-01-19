import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetProductListUseCase {
  constructor(private productRepository: ProductRepository) {}

  execute(pagination: PaginationDto, storeId?: string) {
    if (storeId) {
      return this.productRepository.findAllByStoreId(pagination, storeId);
    }

    return this.productRepository.findAll(pagination);
  }
}
