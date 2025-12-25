import { BadRequestException, Injectable } from '@nestjs/common';
import { StoreRepository } from '../../infrastructure/repositories/store.repository';
import { CreateStoreDto } from '../dtos/create-store.dto';
import { StoreModel } from '../../domain/models/store.model';
import { AuthUser } from '@/shared/types/auth-user.type';

@Injectable()
export class CreateStoreUseCase {
  constructor(private storeRepository: StoreRepository) {}

  async execute(createStoreDto: CreateStoreDto, authUser: AuthUser) {
    const existingStoreSlug = await this.storeRepository.findBySlug(createStoreDto.slug);
    if (existingStoreSlug) throw new BadRequestException("Store's slug is already exist");

    const existingStorePhone = await this.storeRepository.findByPhone(createStoreDto.phone);
    if (existingStorePhone) throw new BadRequestException("Store's phone is already exist");

    const store = this.storeRepository.create({
      ...createStoreDto,
      owner: authUser.userId,
      createdBy: authUser.userId,
    });
    await this.storeRepository.save(store);

    return new StoreModel(store);
  }
}
