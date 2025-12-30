import type z from 'zod';

import type { createCategorySchema } from '../schema/create-category.schema';

export type CreateCategoryType = z.infer<typeof createCategorySchema>;
