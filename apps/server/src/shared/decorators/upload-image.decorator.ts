import { applyDecorators, UseInterceptors } from '@nestjs/common';
import { ImageInterceptor } from '../interceptors/image-upload.interceptor';

export function UploadImage(fieldName: string = 'file') {
  return applyDecorators(UseInterceptors(ImageInterceptor(fieldName)));
}
