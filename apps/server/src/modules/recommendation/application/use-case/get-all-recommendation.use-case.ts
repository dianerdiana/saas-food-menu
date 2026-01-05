import { ForbiddenException, Injectable } from '@nestjs/common';

import { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { RecommendationEntity } from '../../domain/entities/recommendation.entity';
import { RecommendationRepository } from '../../infrastructure/repositories/recommendation.repository';

import { AuthUser } from '@/shared/types/auth-user.type';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { Action, Subject } from '@/shared/enums/access-control.enum';

@Injectable()
export class GetAllRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(paginationDto: PaginationDto, authUser: AuthUser, ability: AppAbility) {
    const { limit, page } = paginationDto;

    let data: RecommendationEntity[] = [];
    let count: number = 0;

    if (ability.can(Action.Manage, Subject.All)) {
      [data, count] = await this.recommendationRepository.findAll(paginationDto);
    } else if (ability.can(Action.Read, Subject.Recommendation)) {
      [data, count] = await this.recommendationRepository.findAllByStoreId(paginationDto, authUser.storeId);
    } else {
      throw new ForbiddenException('You are not allowed to access categories');
    }

    const totalPages = Math.ceil(count / limit);

    return {
      categories: data,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
