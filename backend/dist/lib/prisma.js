// import 'dotenv/config';
import { createRequire } from 'module';
import { PrismaPg } from '@prisma/adapter-pg';
const require = createRequire(import.meta.url);
import { PrismaClient } from '@prisma/client';
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });
export { prisma };
//# sourceMappingURL=prisma.js.map