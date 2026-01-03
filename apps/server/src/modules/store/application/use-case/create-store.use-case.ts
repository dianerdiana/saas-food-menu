import { BadRequestException, Injectable } from '@nestjs/common';

import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { StoreResponse } from '../../interface/responses/store.response';

import { AuthUser } from '@/shared/types/auth-user.type';
import { ImageRequiredDto } from '@/shared/dtos/image.dto';
import { GENERAL_STATUS } from '@/shared/constants/general-status.constant';

@Injectable()
export class CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(createStoreDto: CreateStoreDto & ImageRequiredDto, authUser: AuthUser) {
    const existingStoreSlug = await this.storeRepository.findBySlug(createStoreDto.slug);
    if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");

    const existingStorePhone = await this.storeRepository.findByPhone(createStoreDto.phone);
    if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");

    const store = this.storeRepository.create({
      ...createStoreDto,
      owner: authUser.userId,
      createdBy: authUser.userId,
      status: GENERAL_STATUS.active,
    });
    await this.storeRepository.save(store);

    return new StoreResponse(store);
  }
}
