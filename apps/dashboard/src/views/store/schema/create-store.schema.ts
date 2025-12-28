import z from 'zod';

export const createStoreSchema = z.object({
  name: z.string(),
  slug: z.string(),
  phone: z.string(),
  address: z.string().optional(),
  description: z.string().optional(),
});
