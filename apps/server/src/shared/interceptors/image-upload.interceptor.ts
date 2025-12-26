import { FileInterceptor } from '@nestjs/platform-express';
import { mixin, NestInterceptor, Type, BadRequestException } from '@nestjs/common';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { IMAGE_UPLOAD_CONFIG } from '../constants/image-upload-config.constant';

export function ImageInterceptor(fieldName: string): Type<NestInterceptor> {
  const multerOptions: MulterOptions = {
    limits: {
      fileSize: IMAGE_UPLOAD_CONFIG.maxSize,
    },
    fileFilter: (req, file, callback) => {
      if (!file.mimetype.match(IMAGE_UPLOAD_CONFIG.fileType)) {
        return callback(
          new BadRequestException('Format file tidak didukung! Gunakan jpg, jpeg, png, atau webp'),
          false,
        );
      }
      callback(null, true);
    },
  };

  return mixin(class Interceptor extends FileInterceptor(fieldName, multerOptions) {});
}
