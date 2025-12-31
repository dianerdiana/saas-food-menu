import type z from 'zod';

import type { updateCategorySchema } from '../schema/update-category.schema';

export type UpdateCategoryType = z.infer<typeof updateCategorySchema>;
