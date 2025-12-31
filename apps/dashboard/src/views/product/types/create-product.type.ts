import type z from 'zod';

import type { createProductSchema } from '../schema/create-product.schema';

export type CreateCategoryType = z.infer<typeof createProductSchema>;
