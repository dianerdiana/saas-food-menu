import { Injectable, NotFoundException } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { StoreModel } from '../../domain/models/store.model';
import { UpdateStoreDto } from '../dtos/update-store.dto';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(updateStoreDto: UpdateStoreDto, storeId: string, authUser: AuthUser) {
    const { name, phone, slug, address, description, latitude, longitude } = updateStoreDto;

    const store = await this.storeRepository.findById(storeId);
    if (!store) throw new NotFoundException('Store is not found');

    store.name = name;
    store.name = phone;
    store.name = slug;

    if (store.address) store.address = address;
    if (store.description) store.description = description;
    if (store.latitude) store.latitude = latitude;
    if (store.longitude) store.longitude = longitude;

    store.updatedBy = authUser.userId;

    await this.storeRepository.save(store);

    return new StoreModel(store);
  }
}
