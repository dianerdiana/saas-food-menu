import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { UpdateStoreDto } from '../dtos/update-store.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { StorageService } from '@/shared/services/storage.service';

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private storageService: StorageService,
  ) {}

  async execute(dto: UpdateStoreDto & ImageOptionalDto, userId: string, storeId: string) {
    const { name, phone, slug, address, description, latitude, longitude, image, userId: ownerId } = dto;

    const store = await this.storeRepository.findById(storeId);
    if (!store) throw new NotFoundException('Store is not found');

    if (slug !== store.slug) {
      const existingStoreSlug = await this.storeRepository.findBySlug(slug);
      if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");
    }

    if (phone !== store.phone) {
      const existingStorePhone = await this.storeRepository.findByPhone(phone);
      if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");
    }

    store.name = name;
    store.phone = phone;
    store.slug = slug;

    if (ownerId) store.ownerId = ownerId;
    if (address !== undefined) store.address = address;
    if (description !== undefined) store.description = description;
    if (latitude !== undefined) store.latitude = latitude;
    if (longitude !== undefined) store.longitude = longitude;
    if (image) {
      if (store.image) await this.storageService.deleteFile(store.image);
      store.image = image;
    }

    store.updatedBy = userId;

    await this.storeRepository.save(store);

    return store;
  }
}
