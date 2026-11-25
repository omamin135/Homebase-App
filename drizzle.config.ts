import type { Config } from 'drizzle-kit';

export default {
  dialect: 'sqlite',
  driver: 'expo',
  schema: './src/core/db/schema.ts',
  out: './drizzle',
} satisfies Config;
