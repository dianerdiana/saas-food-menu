import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateRecommendationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  displayMode!: string;

  @IsArray()
  @IsOptional()
  productIds?: string[];

  @IsString()
  @IsOptional()
  storeId?: string;
}
