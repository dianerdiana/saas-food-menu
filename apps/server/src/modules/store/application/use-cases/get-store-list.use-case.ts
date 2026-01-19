import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

@Injectable()
export class GetStoreListUseCase {
  constructor(private storeRepository: StoreRepository) {}

  execute(pagination: PaginationDto, userId?: string) {
    if (userId) {
      return this.storeRepository.findAllOwned(pagination, userId);
    }

    return this.storeRepository.findAll(pagination);
  }
}
