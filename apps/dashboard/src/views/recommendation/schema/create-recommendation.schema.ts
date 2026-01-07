import z from 'zod';

export const createRecommendationSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  price: z.string().min(1, 'Harga wajib diisi'),
  description: z.string().optional(),
  categoryId: z.string(),
});
