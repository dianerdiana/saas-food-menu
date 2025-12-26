import { Transform, Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Matches } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.trim().replace(/\s+/g, '-').toLowerCase();
    }
    return value;
  })
  @Matches(/^[a-z0-9-]+$/, {
    message: 'Slug only can be letters, numbers, and slash sign (-)',
  })
  slug!: string;

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
}
