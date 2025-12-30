import z from 'zod';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const phoneNumberSchema = z
  .string()
  .transform((val) => val.replace(/\s+/g, '').replace(/-/g, '')) // Hapus spasi dan strip
  .pipe(
    z
      .string()
      .regex(/^[0-9]+$/, 'Must be digits only')
      .min(10, 'Number must be at least 10 digits')
      .max(15, 'Number length max 15 digits'),
  );

export const imageRequiredSchema = z
  .any()
  .refine((file) => file, `Image is required`)
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.',
  );

export const imageOptionalSchema = z
  .any()
  .optional()
  .nullable()
  .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    'Only .jpg, .jpeg, .png and .webp formats are supported.',
  );
