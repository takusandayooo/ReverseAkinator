import { z } from 'zod';

const EnvSchema = z.object({
  GEMINI_API_KEY: z.string(),
});

export const getEnvContent = () => {
  const env = require('dotenv').config().parsed;
  return EnvSchema.parse(env);
};