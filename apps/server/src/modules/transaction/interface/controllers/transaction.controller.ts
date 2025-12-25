// NestJs
import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';

// Dto
import { CreateTransactionDto } from '../../application/dtos/create-transaction.dto';
import { UpdateTransactionDto } from '../../application/dtos/update-transaction.dto';

// Shared
import type { AuthUser } from '@/shared/types/auth-user.type';
import { GetAuthUser } from '@/shared/decorators/get-user.decorator';
import { PaginationDto } from '@/shared/dtos/pagination.dto';

// Use-cases
import { CreateTransactionUseCase } from '../../application/use-case/create-transaction.use-case';
import { DeleteTransactionUseCase } from '../../application/use-case/delete-transaction.use-case';
import { GetAllTransactionUseCase } from '../../application/use-case/get-all-transaction.use-case';
import { GetTransactionByIdUseCase } from '../../application/use-case/get-transaction-by-id.use-case';
import { UpdateTransactionUseCase } from '../../application/use-case/update-transaction.use-case';

@Controller('transactions')
export class TransactionController {
  constructor(
    private createTransactionUseCase: CreateTransactionUseCase,
    private deleteTransactionUseCase: DeleteTransactionUseCase,
    private getAllTransactionUseCase: GetAllTransactionUseCase,
    private getTransactionByIdUseCase: GetTransactionByIdUseCase,
    private updateTransactionUseCase: UpdateTransactionUseCase,
  ) {}

  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto, @GetAuthUser() authUser: AuthUser) {
    return await this.createTransactionUseCase.execute(createTransactionDto, authUser);
  }

  @Get()
  async getAllTransaction(@Query() paginationDto: PaginationDto) {
    return await this.getAllTransactionUseCase.execute(paginationDto);
  }

  @Get('id/:id')
  async getTransactionById(@Param('id') id: string) {
    return await this.getTransactionByIdUseCase.execute(id);
  }

  @Put(':id')
  async updateTransaction(
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Param('id') id: string,
    @GetAuthUser() authUser: AuthUser,
  ) {
    return await this.updateTransactionUseCase.execute(updateTransactionDto, id, authUser);
  }

  @Delete(':id')
  async deleteTransaction(@Param('id') id: string, @GetAuthUser() authUser: AuthUser) {
    return await this.deleteTransactionUseCase.execute(id, authUser);
  }
}
