import type z from 'zod';

import type { signUpSchema } from '../schema/signup.schema';

export type SignUpType = z.infer<typeof signUpSchema>;
