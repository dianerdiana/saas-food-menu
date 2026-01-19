import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

@Injectable()
export class DeleteStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(id: string, userId: string) {
    const store = await this.storeRepository.findById(id);
    if (!store) throw new NotFoundException('Store is not found');

    store.deletedBy = userId;
    await this.storeRepository.save(store);

    const updateResult = await this.storeRepository.deleteById(store.id);

    return updateResult.affected && true;
  }
}
