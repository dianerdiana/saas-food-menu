import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateRecommendationDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  displayMode!: string;
}
