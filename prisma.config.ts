import { config } from 'dotenv';
import { defineConfig } from 'prisma/config';

// The Prisma CLI doesn't read .env.local on its own (Next.js does).
config({ path: '.env.local' });

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
