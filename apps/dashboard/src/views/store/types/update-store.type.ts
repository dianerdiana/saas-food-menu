import type z from 'zod';

import type { updateStoreSchema } from '../schema/update-store.schema';

export type UpdateStoreType = z.infer<typeof updateStoreSchema>;
