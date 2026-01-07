import type z from 'zod';

import type { createRecommendationSchema } from '../schema/create-recommendation.schema';

export type CreateRecommendationType = z.infer<typeof createRecommendationSchema>;
