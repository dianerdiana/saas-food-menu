import { Injectable, NotFoundException } from '@nestjs/common';
import { PasswordService } from '@/modules/auth/infrastructure/config/password.service';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { StoreModel } from '../../domain/models/store.model';
import { UpdateStoreDto } from '../dtos/update-store.dto';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(updateStoreDto: UpdateStoreDto, storeId: string) {
    const {} = updateStoreDto;
    const store = await this.storeRepository.findById(storeId);

    if (!store) throw new NotFoundException('Store is not found');

    await this.storeRepository.save(store);
    return new StoreModel(store);
  }
}
