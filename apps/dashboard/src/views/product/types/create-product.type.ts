import type z from 'zod';

import type { createProductSchema } from '../schema/create-product.schema';

export type CreateProductType = z.infer<typeof createProductSchema>;
