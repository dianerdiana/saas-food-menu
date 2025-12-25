// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateProductDto } from '../../application/dtos/create-product.dto';
import { UpdateProductDto } from '../../application/dtos/update-product.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateProductUseCase } from '../../application/use-case/create-product.use-case';
import { DeleteProductUseCase } from '../../application/use-case/delete-product.use-case';
import { GetAllProductUseCase } from '../../application/use-case/get-all-product.use-case';
import { GetProductByIdUseCase } from '../../application/use-case/get-product-by-id.use-case';
import { UpdateProductUseCase } from '../../application/use-case/update-product.use-case';

@Controller('products')
export class ProductController {
  constructor(
    private createProductUseCase: CreateProductUseCase,
    private deleteProductUseCase: DeleteProductUseCase,
    private getAllProductUseCase: GetAllProductUseCase,
    private getProductByIdUseCase: GetProductByIdUseCase,
    private updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createProductUseCase.execute(createProductDto, authUser);
  }

  @Get()
  async getAllProduct(@Query() paginationDto: PaginationDto) {
    return await this.getAllProductUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getProductById(@Param('id') id: string) {
    return await this.getProductByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    return await this.updateProductUseCase.execute(updateProductDto, id, authUser);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteProductUseCase.execute(id, authUser);
  }
}
