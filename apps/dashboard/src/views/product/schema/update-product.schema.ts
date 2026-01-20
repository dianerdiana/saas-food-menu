import z from 'zod';

export const updateProductSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.number().int(),
  description: z.string().optional(),
  categoryId: z.string().min(1),
  storeId: z.string().optional(),
});
