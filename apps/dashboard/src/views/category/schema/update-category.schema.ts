import z from 'zod';

export const updateCategorySchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional(),
  storeId: z.string(),
});
