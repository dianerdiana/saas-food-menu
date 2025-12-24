import { Injectable } from '@nestjs/common';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { UserModel } from '../../domain/models/user.model';

@Injectable()
export class GetAllUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    const [data, count] = await this.userRepository.findAll(paginationDto);
    const users = data.map((user) => new UserModel(user));

    const totalPages = Math.ceil(count / limit);

    return {
      users,
      meta: {
        page,
        limit,
        totalItems: count,
        totalPages,
      },
    };
  }
}
