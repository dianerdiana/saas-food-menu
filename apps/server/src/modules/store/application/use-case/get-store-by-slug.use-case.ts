import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class GetStoreBySlugUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(slug: string) {
    const store = await this.storeRepository.findBySlug(slug);
    if (!store) throw new NotFoundException('Store not found');

    return store;
  }
}
