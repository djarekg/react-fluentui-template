import { PrismaClient } from '#app/generated/prisma/client.js';
import { PrismaPg } from '@prisma/adapter-pg';
// import { PrismaClient } from '@prisma/client';
/**
 * This is a HMR workaround since the module
 * responsible for exporting PrismaClient gets refreshed, which can result
 * in new instances of PrismaClient being created.
 *
 * @see {@link https://www.prisma.io/docs/guides/performance-and-optimization/connection-management#prevent-hot-reloading-from-creating-new-instances-of-prismaclient | PrismaClient in long-running applications}
 */
const globalForPrisma = global as unknown as { prisma: PrismaClient; };

type getPrismaProps = {
  connectionString: string;
};

const getPrisma = ({ connectionString }: getPrismaProps): PrismaClient => {
  if (globalForPrisma.prisma) return globalForPrisma.prisma;

  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });
  return prisma;
};

/**
 * `PrismaClient` singleton.
 */
export const prisma = getPrisma({ connectionString: `${process.env.DATABASE_URL}` });

if (process.env['NODE_ENV'] !== 'production') {
  globalForPrisma.prisma = prisma;
}

// export const prisma = new PrismaClient();
