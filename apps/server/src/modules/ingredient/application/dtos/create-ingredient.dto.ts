import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {
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
