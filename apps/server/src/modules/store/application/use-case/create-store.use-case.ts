import { BadRequestException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageRequiredDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';

@Injectable()
export class CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(createStoreDto: CreateStoreDto & ImageRequiredDto, authUser: AuthUser, ability: AppAbility) {
    const existingStoreSlug = await this.storeRepository.findBySlug(createStoreDto.slug);
    if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");

    const existingStorePhone = await this.storeRepository.findByPhone(createStoreDto.phone);
    if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");

    const ownedStoreCount = await this.storeRepository.countAllOwned(authUser.userId);
    const maxStores = ability.can('manage', 'Store') ? null : 1;

    if (maxStores !== null && ownedStoreCount >= maxStores) {
      throw new BadRequestException('You already reached store limit');
    }

    const store = this.storeRepository.create({
      ...createStoreDto,
      owner: authUser.userId,
      createdBy: authUser.userId,
      status: GENERAL_STATUS.active,
    });

    await this.storeRepository.save(store);

    return store;
  }
}
