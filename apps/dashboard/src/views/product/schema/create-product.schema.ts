import z from 'zod';

import { imageRequiredSchema } from '@/utils/global-schema';

export const createProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().int(),
  image: imageRequiredSchema,
  description: z.string().optional(),
  categoryId: z.string().min(1),
});
