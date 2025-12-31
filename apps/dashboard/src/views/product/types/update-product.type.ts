import type z from 'zod';

import type { updateProductSchema } from '../schema/update-product.schema';

export type UpdateCategoryType = z.infer<typeof updateProductSchema>;
