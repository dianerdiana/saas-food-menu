import z from 'zod';

import { imageRequiredSchema } from '@/schemas/global-schema';

export const createCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  image: imageRequiredSchema,
  description: z.string().optional(),
});
