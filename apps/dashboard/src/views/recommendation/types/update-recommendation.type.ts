import type z from 'zod';

import type { updateRecommendationSchema } from '../schema/update-recommendation.schema';

export type UpdateRecommendationType = z.infer<typeof updateRecommendationSchema>;
