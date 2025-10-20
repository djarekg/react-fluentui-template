import type { PrismaClient } from '#app/generated/prisma/client.js';

export type Context = {
  prisma: PrismaClient;
};
