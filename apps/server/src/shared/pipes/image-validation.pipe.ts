import { ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { IMAGE_UPLOAD_CONFIG } from '../constants/image-upload-config.constant';

export const ImageValidationPipe = new ParseFilePipe({
  validators: [
    new MaxFileSizeValidator({
      maxSize: IMAGE_UPLOAD_CONFIG.maxSize,
      message: 'Ukuran file terlalu besar (Maks 5MB)',
    }),
    new FileTypeValidator({
      fileType: IMAGE_UPLOAD_CONFIG.fileType,
    }),
  ],
});
