import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { ProductModel } from '../../domain/models/product.model';

@Injectable()
export class GetAllProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.productRepository.findAll(paginationDto);
    const products = data.map((product) => new ProductModel(product));

    const totalPages = Math.ceil(count / limit);

    return {
      products,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
