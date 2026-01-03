import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { CheckPolicies } from '@/modules/authorization/infrastructure/decorator/check-policies.decorator';
import { PoliciesGuard } from '@/modules/authorization/infrastructure/guards/policies.guard';
import type { AppAbility } from '@/modules/authorization/infrastructure/factories/casl-ability.factory';

import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';

import { CreateStoreUseCase } from '../../application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from '../../application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from '../../application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from '../../application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from '../../application/use-case/update-store.use-case';

import type { AuthUser } from '@/shared/types/auth-user.type';
import { Action } from '@/shared/enums/action.enum';
import { Subject } from '@/shared/enums/subject.enum';
import { PaginationDto } from '@/shared/dtos/pagination.dto';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { GetAbillity } from '@/shared/decorators/get-ability.decorator';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { StorageService } from '@/shared/services/storage.service';
import { BUCKET_FOLDER_NAME } from '@/shared/constants/bucket-folder-name.constant';

@Controller('stores')
export class StoreController {
  constructor(
    private createStoreUseCase: CreateStoreUseCase,
    private deleteStoreUseCase: DeleteStoreUseCase,
    private getAllStoreUseCase: GetAllStoreUseCase,
    private getStoreByIdUseCase: GetStoreByIdUseCase,
    private getStoreBySlugUseCase: GetStoreBySlugUseCase,
    private updateStoreUseCase: UpdateStoreUseCase,
    private storageService: StorageService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Create, Subject.Store))
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
    @GetAbillity() ability: AppAbility,
  ) {
    if (!image) throw new BadRequestException('Image is not found');

    const url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.stores);
    const result = await this.createStoreUseCase.execute({ ...createStoreDto, image: url }, authUser, ability);

    return {
      message: 'Successfuly created store',
      data: result,
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get()
  async getAllStore(
    @Query() paginationDto: PaginationDto,
    @GetAuthUser() authUser: AuthUser,
    @GetAbillity() ability: AppAbility,
  ) {
    const result = await this.getAllStoreUseCase.execute(paginationDto, authUser, ability);

    return {
      data: result.stores,
      meta: result.meta,
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get('id/:id')
  async getStoreById(@Param('id') id: string) {
    return await this.getStoreByIdUseCase.execute(id);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Read, Subject.Store))
  @Get('slug/:slug')
  async getStoreBySlug(@Param('slug') slug: string) {
    return await this.getStoreBySlugUseCase.execute(slug);
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Update, Subject.Store))
  @UseInterceptors(FileInterceptor('image'))
  @Put(':id')
  async updateStore(
    @Body() updateStoreDto: UpdateStoreDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(new ImageValidationPipe(false)) image: Express.Multer.File,
  ) {
    let url: undefined | null | string = null;

    if (image) {
      url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.products);
    }

    const result = await this.updateStoreUseCase.execute({ ...updateStoreDto, image: url }, id, authUser);
    return {
      message: 'Successfuly updated store',
      data: result,
    };
  }

  @UseGuards(PoliciesGuard)
  @CheckPolicies((ability) => ability.can(Action.Delete, Subject.Store))
  @Delete(':id')
  async deleteStore(@Param('id') id: string, @GetAuthUser() authUser: AuthUser, ability: AppAbility) {
    const result = await this.deleteStoreUseCase.execute(id, authUser, ability);
    return {
      message: 'Successfuly deleted store',
      data: result,
    };
  }
}
