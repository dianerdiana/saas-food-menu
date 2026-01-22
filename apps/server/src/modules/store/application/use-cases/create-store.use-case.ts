import { BadRequestException, Injectable } from '@nestjs/common';

import { StoreEntity } from '../../domain/entities/store.entity';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { CreateStoreDto } from '../dtos/create-store.dto';

import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';

@Injectable()
export class CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  create(dto: CreateStoreDto & ImageOptionalDto, userId: string) {
    const store = this.storeRepository.create({
      ...dto,
      ownerId: dto.userId,
      createdBy: userId,
      status: GENERAL_STATUS.active,
    });

    return store;
  }

  async save(store: StoreEntity, maxStores: number | null) {
    const existingStoreSlug = await this.storeRepository.findBySlug(store.slug);
    if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");

    if (store.phone) {
      const existingStorePhone = await this.storeRepository.findByPhone(store.phone);
      if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");
    }

    const ownedStoreCount = await this.storeRepository.countAllOwned(store.ownerId);

    if (maxStores !== null && ownedStoreCount >= maxStores) {
      throw new BadRequestException('You already reached store limit');
    }

    await this.storeRepository.save(store);

    return store;
  }
}
