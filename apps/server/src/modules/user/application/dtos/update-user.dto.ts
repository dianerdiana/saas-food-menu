import { Match } from '@/shared/decorators/match.decorator';
import { UserStatus } from '@/shared/enums/user-status.enum';
import { Transform } from 'class-transformer';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName!: string;

  @IsString()
  @IsOptional()
  lastName?: string = '';

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @IsString()
  @IsNotEmpty()
  username!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsEnum(UserStatus)
  @IsOptional()
  status?: UserStatus;

  @IsString()
  @IsOptional()
  @MinLength(6)
  @Transform(({ value }) => (value === '' ? undefined : value))
  password?: string;

  @IsString()
  @IsOptional()
  @Match('password')
  @Transform(({ value }) => (value === '' ? undefined : value))
  confirmPassword?: string;
}
