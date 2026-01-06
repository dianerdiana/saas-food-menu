import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

import { SlugRequiredDto } from '@/shared/dtos/slug.dto';

export class UpdateProductDto extends SlugRequiredDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  price!: number;

  @IsString()
  @IsNotEmpty()
  categoryId!: string;

  @IsString()
  @IsOptional()
  storeId?: string;
}
