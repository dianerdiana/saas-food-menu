import { Injectable } from '@nestjs/common';
import { CategoryRepository } from '../../infrastructure/repositories/category.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetCategoryListUseCase {
  constructor(private categoryRepository: CategoryRepository) {}

  execute(pagination: PaginationDto, storeId?: string) {
    if (storeId) {
      return this.categoryRepository.findAllByStoreId(pagination, storeId);
    }

    return this.categoryRepository.findAll(pagination);
  }
}
