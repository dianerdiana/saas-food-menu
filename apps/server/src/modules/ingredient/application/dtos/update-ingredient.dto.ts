import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateIngredientDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  slug!: string;

  @IsNumber()
  @IsNotEmpty()
  sequence!: number;
}
