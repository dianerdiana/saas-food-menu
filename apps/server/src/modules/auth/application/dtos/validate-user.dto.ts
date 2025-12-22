import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ValidateUserDto {
  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password!: string;
}
