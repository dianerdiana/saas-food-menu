import { BadRequestException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';
import { BulkCreateDefaultCategoryUseCase } from '@/modules/category/application/use-case/bulk-create-default-category.use-case';
import { BulkCreateDefaultRecommendationUseCase } from '@/modules/recommendation/application/use-cases/bluk-create-default-recommendation.use-case';

import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageRequiredDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';
import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';

@Injectable()
export class CreateStoreUseCase {
  constructor(
    private storeRepository: StoreRepository,
    private bulkCreateDefaultCategory: BulkCreateDefaultCategoryUseCase,
    private bulkCreateDefaultRecommendation: BulkCreateDefaultRecommendationUseCase,
  ) {}

  async execute(createStoreDto: CreateStoreDto & ImageRequiredDto, authUser: AuthUser, ability: AppAbility) {
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
    await this.bulkCreateDefaultCategory.execute(store.id);
    await this.bulkCreateDefaultRecommendation.execute(store.id);

    return store;
  }
}
