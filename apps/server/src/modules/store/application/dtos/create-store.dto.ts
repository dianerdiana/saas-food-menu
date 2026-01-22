import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateStoreDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsString()
  @IsOptional()
  phone!: string;

  @IsNumber()
  @IsOptional()
  @Min(-90)
  @Max(90)
  latitude?: number | null;

  @IsNumber()
  @IsOptional()
  @Min(-180)
  @Max(180)
  longitude?: number | null;

  @IsString()
  @IsOptional()
  address?: string | null;

  @IsString()
  @IsOptional()
  description?: string | null;

  @IsString()
  @IsOptional()
  userId?: string;
}
