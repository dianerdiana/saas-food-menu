import type z from 'zod';

import type { updateProductSchema } from '../schema/update-recommendation.schema';

export type UpdateProductType = z.infer<typeof updateProductSchema>;
