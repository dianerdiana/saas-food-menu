import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class GetStoreProductById {
  constructor(private storeRepository: StoreRepository) {}

  async execute(storeId: string) {
    const store = await this.storeRepository.findById(storeId);

    if (!store) throw new NotFoundException('Store with product is not found');

    return store;
  }
}
