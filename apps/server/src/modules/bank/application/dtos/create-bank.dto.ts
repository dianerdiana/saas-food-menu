import { IsNotEmpty, IsString } from 'class-validator';

export class CreateBankDto {
  @IsString()
  @IsNotEmpty()
  account!: string;

  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  number!: string;
}
