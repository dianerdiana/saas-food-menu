import { Injectable } from '@nestjs/common';
import { PublicStoreRepository } from '../../infrastructure/repositories/public-store.repository';

@Injectable()
export class PublicStoreService {
  constructor(private PublicStoreRepository: PublicStoreRepository) {}

  async findBySlug(slug: string, includes?: string[]) {
    const store = await this.PublicStoreRepository.findBySlugWithRelation(slug, includes);
    return store;
  }
}
