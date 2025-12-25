// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateBankDto } from '../../application/dtos/create-bank.dto';
import { UpdateBankDto } from '../../application/dtos/update-bank.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateBankUseCase } from '../../application/use-case/create-bank.use-case';
import { DeleteBankUseCase } from '../../application/use-case/delete-bank.use-case';
import { GetAllBankUseCase } from '../../application/use-case/get-all-bank.use-case';
import { GetBankByIdUseCase } from '../../application/use-case/get-bank-by-id.use-case';
import { UpdateBankUseCase } from '../../application/use-case/update-bank.use-case';

@Controller('banks')
export class BankController {
  constructor(
    private createBankUseCase: CreateBankUseCase,
    private deleteBankUseCase: DeleteBankUseCase,
    private getAllBankUseCase: GetAllBankUseCase,
    private getBankByIdUseCase: GetBankByIdUseCase,
    private updateBankUseCase: UpdateBankUseCase,
  ) {}

  @Post()
  async createBank(@Body() createBankDto: CreateBankDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createBankUseCase.execute(createBankDto, authUser);
  }

  @Get()
  async getAllBank(@Query() paginationDto: PaginationDto) {
    return await this.getAllBankUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getBankById(@Param('id') id: string) {
    return await this.getBankByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateBank(@Body() updateBankDto: UpdateBankDto, @Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.updateBankUseCase.execute(updateBankDto, id, authUser);
  }

  @Delete(':id')
  async deleteBank(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteBankUseCase.execute(id, authUser);
  }
}
