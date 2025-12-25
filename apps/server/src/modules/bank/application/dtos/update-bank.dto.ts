import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBankDto {
  @IsString()
  @IsNotEmpty()
  account!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  number!: string;
}
