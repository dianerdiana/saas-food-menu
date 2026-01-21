import { Injectable } from '@nestjs/common';
import { GetProductListUseCase } from '@/modules/product/application/use-cases/get-product-list.use-case';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetStoreProductsDash {
  constructor(private getProductList: GetProductListUseCase) {}

  async execute(pagination: PaginationDto, storeId: string) {
    const [products] = await this.getProductList.execute(pagination, storeId);
    return products;
  }
}
