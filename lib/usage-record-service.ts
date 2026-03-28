import { prisma } from '@/lib/prisma';
import type { Prisma } from '@prisma/client';
import type { UsageDirection, UsageSource } from '@/lib/domain-types';

interface CreateUsageRecordInput {
  userId: string;
  source: UsageSource;
  direction: UsageDirection;
  pages: number;
  documentId?: string | null;
  note?: string | null;
}

type PrismaClientLike = typeof prisma | Prisma.TransactionClient;

export async function createUsageRecord(
  input: CreateUsageRecordInput,
  db: PrismaClientLike = prisma
) {
  return db.usageRecord.create({
    data: {
      userId: input.userId,
      source: input.source,
      direction: input.direction,
      pages: input.pages,
      documentId: input.documentId ?? null,
      note: input.note ?? null,
    },
  });
}
