import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class GetStoreByIdUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(id: string) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Store not found');

    return store;
  }
}
