// NestJs
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
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Dto
import { CreateStoreDto } from '../../application/dtos/create-store.dto';
import { UpdateStoreDto } from '../../application/dtos/update-store.dto';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { ImageValidationPipe } from '@/shared/pipes/image-validation.pipe';
import { StorageService } from '@/shared/services/storage.service';

// Use-cases
import { CreateStoreUseCase } from '../../application/use-case/create-store.use-case';
import { DeleteStoreUseCase } from '../../application/use-case/delete-store.use-case';
import { GetAllStoreUseCase } from '../../application/use-case/get-all-store.use-case';
import { GetStoreByIdUseCase } from '../../application/use-case/get-store-by-id.use-case';
import { GetStoreBySlugUseCase } from '../../application/use-case/get-store-by-slug.use-case';
import { UpdateStoreUseCase } from '../../application/use-case/update-store.use-case';
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
  async createStore(
    @Body() createStoreDto: CreateStoreDto,
    @GetAuthUser() authUser: AuthUser,
    @UploadedFile(ImageValidationPipe) image: Express.Multer.File,
  ) {
    if (!image) throw new BadRequestException('Image is not found');

    const url = await this.storageService.uploadSingleImage(image, BUCKET_FOLDER_NAME.stores);
    const result = await this.createStoreUseCase.execute({ ...createStoreDto, image: url }, authUser);

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
  @UseInterceptors(FileInterceptor('image'))
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

  @Delete(':id')
  async deleteStore(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    const result = await this.deleteStoreUseCase.execute(id, authUser);
    return {
      message: 'Successfuly deleted store',
      data: result,
    };
  }
}
