import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { UpdateStoreDto } from '../dtos/update-store.dto';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class UpdateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(
    updateStoreDto: UpdateStoreDto & ImageOptionalDto,
    storeId: string,
    authUser: AuthUser,
    ability: AppAbility,
  ) {
    const { name, phone, slug, address, description, latitude, longitude, image, userId: storeUserId } = updateStoreDto;

    const store = await this.storeRepository.findById(storeId);
    if (!store) throw new NotFoundException('Store is not found');

    if (slug !== store.slug) {
      const existingStoreSlug = await this.storeRepository.findBySlug(slug);
      if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");
    }

    if (!ability.can(Action.Update, store)) {
      throw new ForbiddenException('You are not allowed to edit this store');
    }

    const storeOwnerId = ability.can(Action.Manage, Subject.Store) && storeUserId ? storeUserId : store.ownerId;

    store.name = name;
    store.phone = phone;
    store.slug = slug;
    store.ownerId = storeOwnerId;

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
