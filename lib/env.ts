import { z } from 'zod';

const envSchema = z.object({
  MONGODB_URI: z.string().url().min(1, 'MONGODB_URI is required'),
});

const env = envSchema.parse({
  MONGODB_URI: process.env.MONGODB_URI,
});

export default env;