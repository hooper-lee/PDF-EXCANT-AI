import { prisma } from '@/lib/db/prisma-client';
import type { PrismaClientLike } from '@/lib/repositories/shared';
import type { UsageDirection, UsageSource } from '@/lib/domain';

interface CreateUsageRecordInput {
  userId: string;
  source: UsageSource;
  direction: UsageDirection;
  pages: number;
  documentId?: string | null;
  note?: string | null;
}

export async function createUsageRecordEntry(
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

export async function findUsageRecordsByUserId(
  userId: string,
  limit: number,
  db: PrismaClientLike = prisma
) {
  return db.usageRecord.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
    select: {
      id: true,
      source: true,
      direction: true,
      pages: true,
      note: true,
      createdAt: true,
      documentId: true,
      document: {
        select: {
          id: true,
          originalName: true,
        },
      },
    },
  });
}
