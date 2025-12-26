import type z from 'zod';
import type { signInSchema } from '../schema/signin.schema';

export type SignInDto = z.infer<typeof signInSchema>;
