import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { SlugRequiredDto } from '@/shared/dtos/slug.dto';

export class UpdateCategoryDto extends SlugRequiredDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsOptional()
  description?: string | null;
}
