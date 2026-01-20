import { Injectable } from '@nestjs/common';
import { GetCategoryListUseCase } from '@/modules/category/application/use-cases/get-category-list.use-case';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetStoreCategoriesDash {
  constructor(private getCategoryList: GetCategoryListUseCase) {}

  async execute(pagination: PaginationDto, storeId: string) {
    const [categories] = await this.getCategoryList.execute(pagination, storeId);
    return categories;
  }
}
