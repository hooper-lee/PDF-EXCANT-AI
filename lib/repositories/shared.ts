import type { Prisma } from '@prisma/client';
import { prisma } from '@/lib/db/prisma-client';

export type PrismaClientLike = typeof prisma | Prisma.TransactionClient;
