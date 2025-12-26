// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';

// Use-cases
import { CreateStoreUseCase } from '../../application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from '../../application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from '../../application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from '../../application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from '../../application/use-case/update-store.use-case';

@Controller('stores')
export class StoreController {
  constructor(
    private createStoreUseCase: CreateStoreUseCase,
    private deleteStoreUseCase: DeleteStoreUseCase,
    private getAllStoreUseCase: GetAllStoreUseCase,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private getStoreBySlugUseCase: GetStoreBySlugUseCase,
    private updateStoreUseCase: UpdateStoreUseCase,
  ) {}

  @Post()
  async createStore(@Body() createStoreDto: CreateStoreDto, @GetAuthUser() authUser: AuthUser) {
    const result = await this.createStoreUseCase.execute(createStoreDto, authUser);
    return {
      message: 'Successfuly created store',
      data: result,
    };
  }

  @Get()
  async getAllStore(@Query() paginationDto: PaginationDto) {
    const result = await this.getAllStoreUseCase.execute(paginationDto);
    return {
      data: result.stores,
      meta: result.meta,
    };
  }

  @Get('id/:id')
  async getStoreById(@Param('id') id: string) {
    return await this.getStoreByIdUseCase.execute(id);
  }

  @Get('slug/:slug')
  async getStoreBySlug(@Param('slug') slug: string) {
    return await this.getStoreBySlugUseCase.execute(slug);
  }

  @Put(':id')
  async updateStore(
    @Body() updateStoreDto: UpdateStoreDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    const result = await this.updateStoreUseCase.execute(updateStoreDto, id, authUser);
    return {
      message: 'Successfuly updated store',
      data: result,
    };
  }

  @Delete(':id')
  async deleteStore(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    const result = await this.deleteStoreUseCase.execute(id, authUser);
    return {
      message: 'Successfuly deleted store',
      data: result,
    };
  }
}
