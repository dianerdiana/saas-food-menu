import { Injectable, NotFoundException } from '@nestjs/common';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class GetStoreByIdsUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(ids: string[]) {
    const stores = await this.storeRepository.findByIds(ids);
    return stores;
  }
}
