import { Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class AccessStoreService {
  constructor(private storeRepository: StoreRepository) {}

  async findById(storeId: string) {
    return await this.storeRepository.findById(storeId);
  }

  async findBySlug(slug: string) {
    return await this.storeRepository.findBySlug(slug);
  }
}
