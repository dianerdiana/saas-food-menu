import { BadRequestException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { InitializeDefaultCategoryService } from '@/modules/category/application/services/initialize-default-category.service';
import { InitializeDefaultRecommendationService } from '@/modules/recommendation/application/services/initialize-default-recommendation.service';

import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageOptionalDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private initializeDefaultCategory: InitializeDefaultCategoryService,
    private initializeDefaultRecommendation: InitializeDefaultRecommendationService,
  ) {}

  async execute(createStoreDto: CreateStoreDto & ImageOptionalDto, authUser: AuthUser, ability: AppAbility) {
    const existingStoreSlug = await this.storeRepository.findBySlug(createStoreDto.slug);
    if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");

    const existingStorePhone = await this.storeRepository.findByPhone(createStoreDto.phone);
    if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");

    const ownedStoreCount = await this.storeRepository.countAllOwned(authUser.userId);
    const maxStores = ability.can(Action.Manage, Subject.Store) ? null : 1;

    if (maxStores !== null && ownedStoreCount >= maxStores) {
      throw new BadRequestException('You already reached store limit');
    }

    const store = this.storeRepository.create({
      ...createStoreDto,
      ownerId: authUser.userId,
      createdBy: authUser.userId,
      status: GENERAL_STATUS.active,
    });

    await this.storeRepository.save(store);
    await this.initializeDefaultCategory.initialize(store.id);
    await this.initializeDefaultRecommendation.initialize(store.id);

    return store;
  }
}
