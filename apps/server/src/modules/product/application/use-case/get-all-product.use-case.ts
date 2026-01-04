import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../../infrastructure/repositories/product.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetAllProductUseCase {
  constructor(private productRepository: ProductRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.productRepository.findAll(paginationDto);

    const totalPages = Math.ceil(count / limit);

    return {
      products: data,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
