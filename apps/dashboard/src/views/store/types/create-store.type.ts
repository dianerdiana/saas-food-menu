import type z from 'zod';

import type { createStoreSchema } from '../schema/create-store.schema';

export type CreateStoreType = z.infer<typeof createStoreSchema>;
