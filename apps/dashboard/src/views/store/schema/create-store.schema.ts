import z from 'zod';

import { phoneNumberSchema } from '@/schemas/global-schema';

export const createStoreSchema = z.object({
  name: z.string().min(1, 'Store name is required'),
  slug: z.string().min(1, 'Store slug is required'),
  phone: phoneNumberSchema,
  address: z.string().optional(),
  description: z.string().optional(),
});
