import type z from 'zod';
import type { signUpSchema } from '../schema/signup.schema';

export type SignUpDto = z.infer<typeof signUpSchema>;
