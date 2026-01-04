import { Injectable, NotFoundException } from '@nestjs/common';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { UpdateStoreDto } from '../dtos/update-store.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(updateStoreDto: UpdateStoreDto & ImageOptionalDto, storeId: string, authUser: AuthUser) {
    const { name, phone, slug, address, description, latitude, longitude, image } = updateStoreDto;

    const store = await this.storeRepository.findById(storeId);
    if (!store) throw new NotFoundException('Store is not found');

    store.name = name;
    store.phone = phone;
    store.slug = slug;

    if (address !== undefined) store.address = address;
    if (description !== undefined) store.description = description;
    if (latitude !== undefined) store.latitude = latitude;
    if (longitude !== undefined) store.longitude = longitude;
    if (image) store.image = image;

    store.updatedBy = authUser.userId;

    await this.storeRepository.save(store);

    return store;
  }
}
