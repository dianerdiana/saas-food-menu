import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { BffStoreRepository } from '../../infrastructure/repositories/bff-store.repository';

@Injectable()
export class BffStoreService {
  constructor(
    private storeRepository: StoreRepository,
    private bffStoreRepository: BffStoreRepository,
  ) {}

  async findBySlug(slug: string, includes?: string[]) {
    const store = await this.bffStoreRepository.findBySlugWithRelation(slug, includes);
    return store;
  }
}
