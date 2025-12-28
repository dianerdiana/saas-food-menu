import type z from 'zod';

import type { signInSchema } from '../schema/signin.schema';

export type SignInType = z.infer<typeof signInSchema>;
