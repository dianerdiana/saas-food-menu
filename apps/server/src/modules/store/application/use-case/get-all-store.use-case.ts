import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { StoreModel } from '../../domain/models/store.model';

@Injectable()
export class GetAllStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.storeRepository.findAll(paginationDto);
    const stores = data.map((store) => new StoreModel(store));
    const totalPages = Math.ceil(count / limit);

    return {
      stores,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
