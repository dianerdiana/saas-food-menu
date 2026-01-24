import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SlugRequiredDto } from '@/shared/dtos/slug.dto';

export class CreateCategoryDto extends SlugRequiredDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  storeId!: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}
