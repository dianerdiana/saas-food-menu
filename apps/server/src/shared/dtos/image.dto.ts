import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ImageRequiredDto {
  @IsString()
  @IsNotEmpty()
  image!: string;
}

export class ImageOptionalDto {
  @IsString()
  @IsOptional()
  image?: string | null;
}
