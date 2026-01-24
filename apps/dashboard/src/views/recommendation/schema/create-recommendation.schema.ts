import z from 'zod';

export const createRecommendationSchema = z.object({
  name: z.string().min(1),
  displayMode: z.enum(['horizontal', 'vertical']),
  productIds: z.array(z.string()),
  storeId: z.string(),
});
