import type z from 'zod';

import type { createProductSchema } from '../schema/create-recommendation.schema';

export type CreateProductType = z.infer<typeof createProductSchema>;
