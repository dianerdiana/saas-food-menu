import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  action!: string;

  @IsString()
  @IsNotEmpty()
  subject!: string;

  @IsString()
  @IsOptional()
  conditions?: string | null;

  @IsBoolean()
  @IsOptional()
  @Type(() => Boolean)
  inverted: boolean = false;

  @IsString()
  @IsOptional()
  reason?: string | null;
}
